from fastapi import FastAPI
from contextlib import asynccontextmanager
import logging
from app.core.config import settings

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("System Bootstrapping...")
    logger.info(f"DB Connection string prepared: {settings.database_url}")
    logger.info(f"Redis target: {settings.REDIS_HOST}:{settings.REDIS_PORT}")
    yield
    logger.info("System Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION
    }
