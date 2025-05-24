import glob
import os
from PyPDF2 import PdfMerger
import logging

# Set up logging to file and console
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("merge_pdfs.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger()

try:
    logger.info(f"Current directory: {os.getcwd()}")

    # Check if stoic_pdfs exists
    subfolder = "stoic_pdfs"
    if not os.path.exists(subfolder):
        logger.error(f"Subfolder '{subfolder}' does not exist!")
        exit()

    # Get all PDFs
    pdf_files = glob.glob(os.path.join(subfolder, "*.pdf"))
    logger.info(f"Found {len(pdf_files)} PDF files: {pdf_files[:5]}")

    if not pdf_files:
        logger.error(f"No PDFs found in '{subfolder}'!")
        exit()

    # Initialize merger
    logger.info("Initializing PdfMerger")
    merger = PdfMerger()

    # Merge PDFs (limit to 100 for testing)
    pdf_files = pdf_files[:100]  # Remove after testing
    for pdf_file in pdf_files:
        logger.info(f"Adding {pdf_file}")
        try:
            merger.append(pdf_file)
        except Exception as e:
            logger.error(f"Failed to add {pdf_file}: {e}")

    # Save merged PDF
    merged_pdf = "stoic_corpus_merged.pdf"
    logger.info(f"Saving merged PDF to {merged_pdf}")
    merger.write()
    merger.write(merged_pdf)
    merger.close()
    logger.info(f"Merged PDF created: {os.path.abspath(merged_pdf)}")

except Exception as e:
    logger.error(f"Script failed: {e}")