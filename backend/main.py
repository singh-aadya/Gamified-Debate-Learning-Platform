"""
Debate Learning Platform - Main FastAPI Application

This is the core backend server that handles:
- User authentication and progress tracking
- AI-powered debate analysis and feedback
- Content delivery and management
- Gamification elements (points, badges, achievements)
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import sqlite3
import json
from datetime import datetime
import os

# Initialize FastAPI app
app = FastAPI(
    title="Debate Learning Platform API",
    description="AI-powered gamified debate learning system",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React/Vite dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
DATABASE_PATH = "debate_platform.db"

def init_database():
    """Initialize SQLite database with required tables"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            age_group TEXT NOT NULL,
            current_level INTEGER DEFAULT 1,
            total_points INTEGER DEFAULT 0,
            badges TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # User progress table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            lesson_id TEXT NOT NULL,
            status TEXT NOT NULL,
            score INTEGER,
            feedback TEXT,
            completed_at TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Debate sessions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS debate_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            topic TEXT NOT NULL,
            position TEXT NOT NULL,
            argument_text TEXT,
            ai_feedback TEXT,
            logical_fallacies TEXT DEFAULT '[]',
            score INTEGER,
            session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_database()

# Pydantic models
class User(BaseModel):
    username: str
    email: str
    age_group: str  # 'elementary', 'middle', 'high', 'college'

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    age_group: str
    current_level: int
    total_points: int
    badges: List[str]

class DebateArgument(BaseModel):
    topic: str
    position: str  # 'for' or 'against'
    argument_text: str

class AIFeedback(BaseModel):
    overall_score: int
    strengths: List[str]
    improvements: List[str]
    logical_fallacies: List[Dict[str, str]]
    argument_structure: Dict[str, Any]
    suggestions: List[str]

# Helper functions
def get_user_by_id(user_id: int) -> Optional[Dict]:
    """Retrieve user from database by ID"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            'id': row[0],
            'username': row[1],
            'email': row[2],
            'age_group': row[3],
            'current_level': row[4],
            'total_points': row[5],
            'badges': json.loads(row[6]),
            'created_at': row[7]
        }
    return None

def analyze_argument_with_ai(argument: DebateArgument) -> AIFeedback:
    """
    AI-powered analysis of debate arguments
    This is a simplified version - in production, this would use advanced NLP models
    """
    
    # Simulate AI analysis
    text = argument.argument_text.lower()
    
    # Basic logical fallacy detection
    fallacies = []
    if "everyone knows" in text or "everybody says" in text:
        fallacies.append({
            "type": "Appeal to Common Belief",
            "description": "Using popularity as evidence for truth",
            "suggestion": "Provide specific evidence rather than claiming universal agreement"
        })
    
    if "always" in text or "never" in text:
        fallacies.append({
            "type": "False Dichotomy",
            "description": "Presenting only two options when more exist",
            "suggestion": "Consider nuanced positions and alternative solutions"
        })
    
    # Basic argument structure analysis
    has_claim = len(text.split()) > 10
    has_evidence = any(word in text for word in ["study", "research", "data", "statistics", "expert"])
    has_reasoning = any(word in text for word in ["because", "therefore", "thus", "since"])
    
    structure_score = sum([has_claim, has_evidence, has_reasoning])
    
    # Generate feedback
    strengths = []
    improvements = []
    
    if has_evidence:
        strengths.append("Good use of evidence to support your position")
    else:
        improvements.append("Include specific evidence, data, or expert opinions")
    
    if has_reasoning:
        strengths.append("Clear logical connection between points")
    else:
        improvements.append("Explain the reasoning that connects your evidence to your claim")
    
    if len(text.split()) > 50:
        strengths.append("Comprehensive argument development")
    else:
        improvements.append("Develop your argument with more detail and examples")
    
    # Calculate overall score
    base_score = min(70 + (structure_score * 10), 100)
    fallacy_penalty = len(fallacies) * 5
    overall_score = max(base_score - fallacy_penalty, 0)
    
    return AIFeedback(
        overall_score=overall_score,
        strengths=strengths,
        improvements=improvements,
        logical_fallacies=fallacies,
        argument_structure={
            "has_clear_claim": has_claim,
            "includes_evidence": has_evidence,
            "shows_reasoning": has_reasoning,
            "structure_score": structure_score
        },
        suggestions=[
            "Practice the Claim-Evidence-Warrant structure",
            "Research opposing viewpoints to strengthen your argument",
            "Use specific examples to illustrate your points"
        ]
    )

# API Routes

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Debate Learning Platform API is running"}

@app.post("/api/users", response_model=UserResponse)
async def create_user(user: User):
    """Create a new user account"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO users (username, email, age_group) VALUES (?, ?, ?)",
            (user.username, user.email, user.age_group)
        )
        user_id = cursor.lastrowid
        conn.commit()
        
        # Return the created user
        created_user = get_user_by_id(user_id)
        return UserResponse(**created_user)
        
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    finally:
        conn.close()

@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """Get user information by ID"""
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(**user)

@app.post("/api/debate/analyze")
async def analyze_debate_argument(argument: DebateArgument, user_id: int):
    """Analyze a debate argument and provide AI feedback"""
    
    # Verify user exists
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get AI feedback
    feedback = analyze_argument_with_ai(argument)
    
    # Store the debate session
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO debate_sessions 
        (user_id, topic, position, argument_text, ai_feedback, logical_fallacies, score)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        argument.topic,
        argument.position,
        argument.argument_text,
        json.dumps(feedback.dict()),
        json.dumps(feedback.logical_fallacies),
        feedback.overall_score
    ))
    
    # Update user points
    points_earned = max(feedback.overall_score // 10, 1)
    cursor.execute(
        "UPDATE users SET total_points = total_points + ? WHERE id = ?",
        (points_earned, user_id)
    )
    
    conn.commit()
    conn.close()
    
    return {
        "feedback": feedback,
        "points_earned": points_earned,
        "message": f"Great work! You earned {points_earned} points."
    }

@app.get("/api/users/{user_id}/progress")
async def get_user_progress(user_id: int):
    """Get user's learning progress and statistics"""
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Get recent debate sessions
    cursor.execute('''
        SELECT topic, position, score, session_date 
        FROM debate_sessions 
        WHERE user_id = ? 
        ORDER BY session_date DESC 
        LIMIT 10
    ''', (user_id,))
    
    recent_sessions = []
    for row in cursor.fetchall():
        recent_sessions.append({
            'topic': row[0],
            'position': row[1],
            'score': row[2],
            'date': row[3]
        })
    
    # Calculate statistics
    cursor.execute(
        "SELECT COUNT(*), AVG(score) FROM debate_sessions WHERE user_id = ?",
        (user_id,)
    )
    stats = cursor.fetchone()
    
    conn.close()
    
    return {
        "user": user,
        "recent_sessions": recent_sessions,
        "total_sessions": stats[0] or 0,
        "average_score": round(stats[1] or 0, 1),
        "next_level_points": (user['current_level'] * 100) - user['total_points']
    }

@app.get("/api/lessons")
async def get_lessons(age_group: str = "middle", level: int = 1):
    """Get lessons appropriate for age group and level"""
    
    # This would typically come from a database or content management system
    lessons = {
        "elementary": {
            1: [
                {
                    "id": "elem_1_1",
                    "title": "What is an Argument?",
                    "description": "Learn the basics of making a point",
                    "type": "interactive",
                    "content": "An argument is when you give reasons why you think something is true."
                },
                {
                    "id": "elem_1_2", 
                    "title": "Taking Turns",
                    "description": "Practice listening and responding",
                    "type": "game",
                    "content": "In debates, everyone gets a turn to speak!"
                }
            ]
        },
        "middle": {
            1: [
                {
                    "id": "mid_1_1",
                    "title": "Argument Structure",
                    "description": "Learn Claim-Evidence-Reasoning format",
                    "type": "tutorial",
                    "content": "Every strong argument has three parts: what you believe (claim), proof (evidence), and why the proof supports your belief (reasoning)."
                },
                {
                    "id": "mid_1_2",
                    "title": "Choosing Your Side",
                    "description": "Practice taking positions on topics",
                    "type": "practice",
                    "content": "Sometimes you'll need to argue for a side you don't personally agree with - that's the challenge!"
                }
            ]
        },
        "high": {
            1: [
                {
                    "id": "high_1_1",
                    "title": "Parliamentary Debate Format",
                    "description": "Master formal debate structures",
                    "type": "advanced",
                    "content": "Parliamentary debate follows specific speaking orders and time limits to ensure fair competition."
                }
            ]
        }
    }
    
    return lessons.get(age_group, {}).get(level, [])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)