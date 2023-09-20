import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function createPDF(data) {

    const doc = await PDFDocument.create();
    const regularFont = await doc.embedFont(StandardFonts.Helvetica);
    const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
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
    let x = 70;
    let y = 700; // Start from top and move downward
    const lineHeight = 25;
    const fontSize = 12;
    const titleSize = 18;
    const subtitleSize = 16;
    const fieldPadding = 10;

    // Draw the date
    const currentDate = new Date().toLocaleDateString('en-US');
    page.drawText(`Date: ${currentDate}`, { x, y, size: fontSize, color: rgb(0, 0, 0) });
    y -= lineHeight;

    function splitText(text, maxLength = 70) {
        const words = text.split(" ");
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            if (currentLine.length + words[i].length + 1 < maxLength) {
                currentLine += " " + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }

        lines.push(currentLine);
        return lines;
    }



    // Define starting positions


    // Function to draw text and move to the next line
    // function drawText(text, size = fontSize, bold = false) {
    //     if (y < 50) {  // Check if we're too close to the bottom edge
    //         page = doc.addPage([600, 800]);
    //         y = 750;
    //     }
    //     page.drawText(text, { x, y, size, color: rgb(0, 0, 0) });
    //     y -= lineHeight;
    // }

    function drawText(text, size = fontSize, bold = false) {
        const lines = splitText(text);
        const font = bold ? boldFont : regularFont;

        for (const line of lines) {
            if (y < 50) {  // Check if we're too close to the bottom edge
                page = doc.addPage([600, 800]);
                y = 750;
            }
            page.drawText(line, { x, y, size, font, color: rgb(0, 0, 0) });
            y -= lineHeight;
        }
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
        Address: "Dhaka",
        Contact: "+880",
        Occupation: "Student",
        MaritalStatus: "Married",
        ChiefComplaints: "Headache",
        HOillness: "Growth of headache",
        PastHistory: "Migrane",
        TreatmentHistory: "Paracetamol",
        OccupationalHistory: "Tution",
        SocioEconomicCondition: "Rich",
        FamilyHistory: "Normal",
        PersonalHistory: "Ganja khay",
        Vaccinationhistory: "vaccinated properly",
        MenstrualHistory: "nil",
        Height: "normal",
        Nutrition: "normal",
        Oedema: "normal",
        Clubbing: "normal",
        Thyroid: "normal",
        Skin: "normal",
        Weight: "normal",
        Anaemia: "normal",
        Cyanosis: "normal",
        Neckvein: "normal",
        Others: "",
        Temperature: "normal",
        Pulse: "70/min",
        BloodPressure: "150/100",
        Jaundice: "normal",
        Dehydration: "normal",
        CardioVascularSystem: "Normal",
        RespiratorySystemm: "Normal",
        GastroIntestinalSystem: "Normal",
        MusculoSkeletalSystem: "Normal",
        NervousSystem: "Normal",
        workupDiagnosis: "Tumour",
        DifferentialDiagnosis: "Tumour, cancer",
        RelativeInvestigationFindings: "Cancer",
        ConfirmatoryDiagnosis: "Cancer",
        Treatment: "Inevitable death",
        FollowUpAdvice: "RIP",
        DischargePrescription: "discharged",
        remarks: "pialBoksod",
    */

    const startInitialInfoY = drawFieldset("Initial Info");
    drawText("Address:", fontSize, true); drawText(`${data["Address"]}`);
    drawText("Contact:", fontSize, true); drawText(`${data["Contact"]}`);
    drawText("Occupation:", fontSize, true); drawText(`${data["Occupation"]}`);
    drawText("Marital Status:", fontSize, true); drawText(`${data["MaritalStatus"]}`);
    endFieldset(startInitialInfoY);


    const startInitialInfoY1 = drawFieldset("Complaints");
    drawText("Chief Complaints:", fontSize, true); drawText(`${data["ChiefComplaints"]}`);
    drawText("History of Illness:", fontSize, true); drawText(`${data["HOillness"]}`);
    endFieldset(startInitialInfoY1);


    const startInitialInfoY2 = drawFieldset("History");
    drawText("History of Past Illness:", fontSize, true); drawText(`${data["PastHistory"]}`);
    drawText("History of Treatment:", fontSize, true); drawText(`${data["TreatmentHistory"]}`);
    drawText("Family History:", fontSize, true); drawText(`${data["FamilyHistory"]}`);
    drawText("Personal History:", fontSize, true); drawText(`${data["PersonalHistory"]}`);
    drawText("Occupational History:", fontSize, true); drawText(`${data["OccupationalHistory"]}`);
    drawText("Socio-Economic History:", fontSize, true); drawText(`${data["SocioEconomicCondition"]} `);
    drawText("Vaccination Status:", fontSize, true); drawText(`${data["Vaccinationhistory"]} `);
    drawText("Menstrual History:", fontSize, true); drawText(`${data["MenstrualHistory"]} `);
    endFieldset(startInitialInfoY2);

    const startInitialInfoY33 = drawFieldset("General Examination");

    drawText("Height:", fontSize, true); drawText(`${data["Height"]} `);
    drawText("Weight:", fontSize, true); drawText(`${data["Weight"]} `);
    drawText("Nutrition:", fontSize, true); drawText(`${data["Nutrition"]} `);
    drawText("Temperature:", fontSize, true); drawText(`${data["Temperature"]} `);
    drawText("Pulse:", fontSize, true); drawText(`${data["Pulse"]} `);
    drawText("Blood Pressure:", fontSize, true); drawText(`${data["BloodPressure"]} `);
    drawText("Oedema:", fontSize, true); drawText(`${data["Oedema"]} `);
    drawText("Clubbing:", fontSize, true); drawText(`${data["Clubbing"]} `);
    drawText("Skin:", fontSize, true); drawText(`${data["Skin"]} `);
    drawText("Neckvein:", fontSize, true); drawText(`${data["Neckvein"]} `);
    drawText("Anaemia:", fontSize, true); drawText(`${data["Anaemia"]} `);
    drawText("Thyroid:", fontSize, true); drawText(`${data["Thyroid"]} `);
    drawText("Cyanosis:", fontSize, true); drawText(`${data["Cyanosis"]} `);
    drawText("Jaundice:", fontSize, true); drawText(`${data["Jaundice"]} `);
    drawText("Dehydration:", fontSize, true); drawText(`${data["Dehydration"]} `);
    drawText("Others:", fontSize, true); drawText(`${data["Others"]} `);
    endFieldset(startInitialInfoY33);


    const startInitialInfoY3 = drawFieldset("Systematic Examination");

    drawText("Cardio-Vascular System:", fontSize, true); drawText(`${data["CardioVascularSystem"]} `);
    drawText("Respiratory Systemm:", fontSize, true); drawText(`${data["RespiratorySystemm"]} `);
    drawText("Gastro-Intestinal System:", fontSize, true); drawText(`${data["GastroIntestinalSystem"]} `);
    drawText("Musculo-Skeletal System:", fontSize, true); drawText(`${data["MusculoSkeletalSystem"]} `);
    drawText("Nervous System:", fontSize, true); drawText(`${data["NervousSystem"]} `);
    endFieldset(startInitialInfoY3);


    const startInitialInfoY4 = drawFieldset("Provisional Stage");
    drawText("Working Diagnosis:", fontSize, true); drawText(`${data["workupDiagnosis"]} `);
    drawText("Differential Diagnosis:", fontSize, true); drawText(`${data["DifferentialDiagnosis"]} `);
    endFieldset(startInitialInfoY4);

    const startInitialInfoY55 = drawFieldset("Investigations & Summary");
    drawText("Relative-Investigation Findings:", fontSize, true); drawText(`${data["RelativeInvestigationFindings"]} `);
    drawText("Salient Features:", fontSize, true); drawText(`${data["SalientFeature"]} `);
    endFieldset(startInitialInfoY55);

    const startInitialInfoY5 = drawFieldset("Final Diagnosis");

    drawText("Confirmatory Diagnosis:", fontSize, true); drawText(`${data["ConfirmatoryDiagnosis"]} `);
    endFieldset(startInitialInfoY5);


    const startInitialInfoY6 = drawFieldset("Treatment");
    drawText("Treatment:", fontSize, true); drawText(`${data["Treatment"]} `);
    drawText("Follow-Up Advice:", fontSize, true); drawText(`${data["FollowUpAdvice"]} `);
    endFieldset(startInitialInfoY6);


    const startInitialInfoY7 = drawFieldset("Discharge");
    drawText("Final remarks:", fontSize, true); drawText(`${data["remarks"]} `);
    endFieldset(startInitialInfoY7);

    // Add other fieldsets in a similar manner
    // For example:
    // const complaintsFields = ["Complaint1", "Complaint2", ...];
    // const startComplaintsY = drawFieldset("Complaints");
    // for (const field of complaintsFields) {
    //     if (data[field]) {
    //         drawText(`${ field }: ${ data[field] } `);
    //     }
    // }
    // endFieldset(startComplaintsY);

    // Continue for other fieldsets...

    const pdfBytes = await doc.save();
    return pdfBytes;
}
