from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.pagesizes import LETTER
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def generate_checking_account_statement(pdf_filename):
    """
    Generate a checking account statement PDF file for Jane Doe
    covering January to December 2025.
    """
    # Sample styles
    styles = getSampleStyleSheet()
    title_style = styles["Title"]
    normal_style = styles["Normal"]
    heading_style = styles["Heading2"]
    
    # Create document
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=LETTER,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )
    
    # A list to hold all flowables (paragraphs, tables, etc.)
    elements = []
    
    # Title page / Cover
    title_paragraph = Paragraph("Jane Doe - Checking Account Statement", title_style)
    date_range_paragraph = Paragraph("Period: January 1, 2025 – December 31, 2025", normal_style)
    account_number_paragraph = Paragraph("Account Number: 123456789", normal_style)
    bank_name_paragraph = Paragraph("Bank: ChatGPT Bank of Wonderland", normal_style)
    
    elements.append(title_paragraph)
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(date_range_paragraph)
    elements.append(account_number_paragraph)
    elements.append(bank_name_paragraph)
    
    # Add some spacing
    elements.append(Spacer(1, 1 * inch))
    intro_text = """
    This statement provides a summary of all transactions on
    the checking account for the period of January 1, 2025 
    through December 31, 2025. Please review the monthly 
    transaction details on the following pages.
    """
    elements.append(Paragraph(intro_text, normal_style))
    
    # Add a page break after the cover/introduction
    elements.append(PageBreak())
    
    # Sample transaction data by month (Jan - Dec)
    # Each entry in the list is (date, description, debit, credit, balance)
    # Note: In a real scenario, you'd calculate the balance dynamically; here it's just illustrative.
    
    transactions_by_month = {
        "January 2025": [
            ("01/02/2025", "Opening Balance", "", "", "3,000.00"),
            ("01/05/2025", "ATM Withdrawal", "200.00", "", "2,800.00"),
            ("01/10/2025", "Salary Deposit", "", "2,500.00", "5,300.00"),
            ("01/15/2025", "Grocery Store", "150.00", "", "5,150.00"),
        ],
        "February 2025": [
            ("02/01/2025", "Opening Balance", "", "", "5,150.00"),
            ("02/03/2025", "Online Purchase", "75.00", "", "5,075.00"),
            ("02/12/2025", "Salary Deposit", "", "2,500.00", "7,575.00"),
            ("02/20/2025", "Utility Bill", "120.00", "", "7,455.00"),
        ],
        "March 2025": [
            ("03/01/2025", "Opening Balance", "", "", "7,455.00"),
            ("03/05/2025", "Gym Membership", "50.00", "", "7,405.00"),
            ("03/10/2025", "Salary Deposit", "", "2,500.00", "9,905.00"),
            ("03/25/2025", "Dining Out", "80.00", "", "9,825.00"),
        ],
        "April 2025": [
            ("04/01/2025", "Opening Balance", "", "", "9,825.00"),
            ("04/02/2025", "Car Payment", "300.00", "", "9,525.00"),
            ("04/10/2025", "Salary Deposit", "", "2,500.00", "12,025.00"),
            ("04/18/2025", "Utility Bill", "130.00", "", "11,895.00"),
        ],
        "May 2025": [
            ("05/01/2025", "Opening Balance", "", "", "11,895.00"),
            ("05/04/2025", "Clothing Store", "90.00", "", "11,805.00"),
            ("05/10/2025", "Salary Deposit", "", "2,500.00", "14,305.00"),
            ("05/23/2025", "Restaurant", "120.00", "", "14,185.00"),
        ],
        "June 2025": [
            ("06/01/2025", "Opening Balance", "", "", "14,185.00"),
            ("06/07/2025", "Medical Bill", "200.00", "", "13,985.00"),
            ("06/10/2025", "Salary Deposit", "", "2,500.00", "16,485.00"),
            ("06/19/2025", "ATM Withdrawal", "300.00", "", "16,185.00"),
        ],
        "July 2025": [
            ("07/01/2025", "Opening Balance", "", "", "16,185.00"),
            ("07/02/2025", "Car Payment", "300.00", "", "15,885.00"),
            ("07/10/2025", "Salary Deposit", "", "2,500.00", "18,385.00"),
            ("07/25/2025", "Grocery Store", "120.00", "", "18,265.00"),
        ],
        "August 2025": [
            ("08/01/2025", "Opening Balance", "", "", "18,265.00"),
            ("08/06/2025", "Online Purchase", "50.00", "", "18,215.00"),
            ("08/10/2025", "Salary Deposit", "", "2,500.00", "20,715.00"),
            ("08/20/2025", "Utility Bill", "100.00", "", "20,615.00"),
        ],
        "September 2025": [
            ("09/01/2025", "Opening Balance", "", "", "20,615.00"),
            ("09/05/2025", "Gas Station", "60.00", "", "20,555.00"),
            ("09/10/2025", "Salary Deposit", "", "2,500.00", "23,055.00"),
            ("09/22/2025", "Restaurant", "80.00", "", "22,975.00"),
        ],
        "October 2025": [
            ("10/01/2025", "Opening Balance", "", "", "22,975.00"),
            ("10/03/2025", "Gym Membership", "50.00", "", "22,925.00"),
            ("10/10/2025", "Salary Deposit", "", "2,500.00", "25,425.00"),
            ("10/28/2025", "Entertainment", "100.00", "", "25,325.00"),
        ],
        "November 2025": [
            ("11/01/2025", "Opening Balance", "", "", "25,325.00"),
            ("11/04/2025", "Car Payment", "300.00", "", "25,025.00"),
            ("11/10/2025", "Salary Deposit", "", "2,500.00", "27,525.00"),
            ("11/15/2025", "Grocery Store", "200.00", "", "27,325.00"),
        ],
        "December 2025": [
            ("12/01/2025", "Opening Balance", "", "", "27,325.00"),
            ("12/05/2025", "Gift Purchase", "150.00", "", "27,175.00"),
            ("12/10/2025", "Salary Deposit", "", "2,500.00", "29,675.00"),
            ("12/20/2025", "Utility Bill", "130.00", "", "29,545.00"),
        ]
    }
    
    # Generate pages for each month
    for month, transactions in transactions_by_month.items():
        # Month heading
        elements.append(Paragraph(month, heading_style))
        elements.append(Spacer(1, 0.1 * inch))
        
        # Table data: headings + transactions
        table_data = [
            ["Date", "Description", "Debit", "Credit", "Balance"]
        ]
        for row in transactions:
            table_data.append(row)
        
        # Create the table
        table = Table(table_data, colWidths=[1.2*inch, 2.2*inch, 1*inch, 1*inch, 1*inch])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (-1,0), colors.lightgrey),
            ("TEXTCOLOR", (0,0), (-1,0), colors.black),
            ("ALIGN", (0,0), (-1,-1), "LEFT"),
            ("GRID", (0,0), (-1,-1), 0.5, colors.black),
            ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
            ("FONTNAME", (0,1), (-1,-1), "Helvetica"),
            ("FONTSIZE", (0,0), (-1,0), 10),
            ("FONTSIZE", (0,1), (-1,-1), 9),
            ("BOTTOMPADDING", (0,0), (-1,0), 6),
        ]))
        
        elements.append(table)
        elements.append(Spacer(1, 0.5 * inch))
        
        # Page break after each month's table except the last
        elements.append(PageBreak())
    
    # Build the PDF
    doc.build(elements)

if __name__ == "__main__":
    # The PDF will be generated in the current directory with this name
    generate_checking_account_statement("JaneDoe_Checking_Statement_2025.pdf")
    print("PDF statement generated: JaneDoe_Checking_Statement_2025.pdf")
