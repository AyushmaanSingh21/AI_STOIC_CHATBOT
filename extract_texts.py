import pdfplumber
import glob
import re
import json
import logging
import os
import warnings

# Suppress pdfminer warnings
warnings.filterwarnings("ignore", category=UserWarning, module="pdfminer")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("extract_texts.log"), logging.StreamHandler()]
)
logger = logging.getLogger()

try:
    pdf_files = glob.glob("stoic_pdfs/*.pdf")
    logger.info(f"Found {len(pdf_files)} PDF files: {pdf_files[:5]}")
    
    if not pdf_files:
        logger.error("No PDFs found in 'stoic_pdfs'!")
        exit()

    texts = []
    batch_size = 5  # Small batch size
    for batch_start in range(0, len(pdf_files), batch_size):
        batch = pdf_files[batch_start:batch_start + batch_size]
        logger.info(f"Processing batch {batch_start // batch_size + 1}: PDFs {batch_start} to {batch_start + len(batch) - 1}")
        
        for idx, pdf_file in enumerate(batch, batch_start + 1):
            try:
                logger.info(f"[{idx}/{len(pdf_files)}] Processing {pdf_file}")
                with pdfplumber.open(pdf_file) as pdf:
                    for page in pdf.pages:
                        text = page.extract_text()
                        if text and len(text.strip()) > 50:
                            text = re.sub(r"page \d+|footer.*", "", text, flags=re.IGNORECASE).strip()
                            texts.append(text)
            except Exception as e:
                logger.error(f"Error in {pdf_file}: {e}")
                continue

        # Save after each batch
        with open("stoic_texts.json", "w", encoding="utf-8") as f:
            json.dump({"texts": texts}, f)
        logger.info(f"Saved {len(texts)} texts so far")

    logger.info("Finished processing all PDFs")

except Exception as e:
    logger.error(f"Script failed: {e}")