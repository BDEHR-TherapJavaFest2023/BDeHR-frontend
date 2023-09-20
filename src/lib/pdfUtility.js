import { PDFDocument, rgb } from 'pdf-lib';

export async function createPDF(data) {
    const doc = await PDFDocument.create();
    let page = doc.addPage([600, 800]);

    const logoUrl = 'https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png?t=2023-09-20T07%3A57%3A01.010Z'; // Replace with your logo's URL
    const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
    const logoImage = await doc.embedPng(logoBytes);
    const logoDimensions = logoImage.scale(0.5);  // Adjust scaling as per your needs

    // Draw logo at desired position
    page.drawImage(logoImage, {
        x: 50,
        y: 770 - logoDimensions.height,
        width: logoDimensions.width,
        height: logoDimensions.height,
    });

    // Define starting positions
    let x = 50;
    let y = 700; // Start from top and move downward
    const lineHeight = 25;
    const fontSize = 12;
    const titleSize = 18;
    const subtitleSize = 14;
    const fieldPadding = 10;

    // Draw the date
    const currentDate = new Date().toLocaleDateString('en-US');
    page.drawText(`Date: ${currentDate}`, { x, y, size: fontSize, color: rgb(0, 0, 0) });
    y -= lineHeight;


    // Define starting positions


    // Function to draw text and move to the next line
    function drawText(text, size = fontSize, bold = false) {
        if (y < 50) {  // Check if we're too close to the bottom edge
            page = doc.addPage([600, 800]);
            y = 750;
        }
        page.drawText(text, { x, y, size, color: rgb(0, 0, 0) });
        y -= lineHeight;
    }

    // Function to draw a rounded rectangle for fieldsets
    function drawFieldset(title) {
        y -= lineHeight;
        drawText(title, subtitleSize, true);
        y -= 10;
        const startFieldsetY = y;
        return startFieldsetY;
    }

    // Function to end a fieldset by drawing a bottom border
    function endFieldset(startFieldsetY) {
        y -= 20;
        // page.drawLine({
        //     start: { x, y },
        //     end: { x: x + 500, y },
        //     thickness: 1,
        //     color: rgb(0.5, 0.5, 0.5),
        // });
    }

    // Add title
    drawText("Medication Details:", titleSize, true);
    y -= 20;
    // Assuming 'Initial Info' contains fields: Address, Contact, Occupation, etc.
    /*
    Address: "Dhaka",
        Contact: "+880",
        Occupation: "Teacher",
        ChiefComplaints: "Headache...",
        HOillness: "Growth of illness",
        PastHistory: "pialBoksod",
        TreatmentHistory: "pialBoksod",
        OccupationalHistory: "pialBoksod",
        SocioEconomicCondition: "pialBoksod",
        Vaccinationhistory: "pialBoksod",
        MenstrualHistory: "pialBoksod",
        GeneralExamination: "pialBoksod",
        CardioVascularSystem: "pialBoksod",
        RespiratorySystemm: "pialBoksod",
        GastroIntestinalSystem: "pialBoksod",
        MusculoSkeletalSystem: "pialBoksod",
        NervousSystem: "pialBoksod",
        workupDiagnosis: "pialBoksod",
        DifferentialDiagnosis: "pialBoksod",
        RelativeInvestigationFindings: "pialBoksod",
        ConfirmatoryDiagnosis: "pialBoksod",
        Treatment: "pialBoksod",
        FollowUpAdvice: "pialBoksod",
        DischargePrescription: "pialBoksod",
        remarks: "pialBoksod",
    */

    const startInitialInfoY = drawFieldset("Initial Info");
    drawText(`${"Address:"} ${data["Address"]}`);
    drawText(`${"Contact:"} ${data["Contact"]}`);
    drawText(`${"Occupation:"} ${data["Occupation"]}`);
    drawText(`${"Occupational History:"} ${data["OccupationalHistory"]}`);
    endFieldset(startInitialInfoY);


    const startInitialInfoY1 = drawFieldset("Complaints");
    drawText(`${"Chief Complaints"}: ${data["ChiefComplaints"]}`);
    drawText(`${"History of Illness"}: ${data["HOillness"]}`);
    endFieldset(startInitialInfoY1);


    const startInitialInfoY2 = drawFieldset("History");
    drawText(`${"Past Illness"}: ${data["PastHistory"]}`);
    drawText(`${"History of Treatment"}: ${data["TreatmentHistory"]}`);
    drawText(`${"Status of Vaccination"}: ${data["Vaccinationhistory"]}`);
    drawText(`${"Menstrual History"}: ${data["MenstrualHistory"]}`);
    endFieldset(startInitialInfoY2);


    const startInitialInfoY3 = drawFieldset("Examination");
    drawText(`${"General Examination"}: ${data["GeneralExamination"]}`);
    drawText(`${"Cardio Vascular System"}: ${data["CardioVascularSystem"]}`);
    drawText(`${"Respiratory System"}: ${data["RespiratorySystemm"]}`);
    drawText(`${"Gastro-Intestinal System"}: ${data["GastroIntestinalSystem"]}`);
    drawText(`${"Musculo-Skeletal System"}: ${data["MusculoSkeletalSystem"]}`);
    drawText(`${"Nervous System"}: ${data["NervousSystem"]}`);
    endFieldset(startInitialInfoY3);


    const startInitialInfoY4 = drawFieldset("Provational Stage");
    drawText(`${"Work-up Diagnosis"}: ${data["workupDiagnosis"]}`);
    drawText(`${"Differential Diagnosis"}: ${data["DifferentialDiagnosis"]}`);
    endFieldset(startInitialInfoY4);


    const startInitialInfoY5 = drawFieldset("Final Diagnosis");
    drawText(`${"Relative Investigations Findings"}: ${data["RelativeInvestigationFindings"]}`);
    drawText(`${"Confirmatory Diagnosis"}: ${data["ConfirmatoryDiagnosis"]}`);
    endFieldset(startInitialInfoY5);


    const startInitialInfoY6 = drawFieldset("Treatment");
    drawText(`${"Treatment"}: ${data["Treatment"]}`);
    drawText(`${"Follow up Advice"}: ${data["FollowUpAdvice"]}`);
    endFieldset(startInitialInfoY6);


    const startInitialInfoY7 = drawFieldset("Discharge");
    drawText(`${"Final Remarks"}: ${data["remarks"]}`);
    endFieldset(startInitialInfoY7);

    // Add other fieldsets in a similar manner
    // For example:
    // const complaintsFields = ["Complaint1", "Complaint2", ...];
    // const startComplaintsY = drawFieldset("Complaints");
    // for (const field of complaintsFields) {
    //     if (data[field]) {
    //         drawText(`${field}: ${data[field]}`);
    //     }
    // }
    // endFieldset(startComplaintsY);

    // Continue for other fieldsets...

    const pdfBytes = await doc.save();
    return pdfBytes;
}
