import logging

def setup_logging():
    logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
    logger = logging.getLogger("app_logger")
    return logger

logger = setup_logging()
