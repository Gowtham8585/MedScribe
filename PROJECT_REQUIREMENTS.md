# Project Requirements

## Project Overview
MediScribe is a modern, professional, responsive healthcare SaaS web application designed for doctors. It acts as an AI-powered voice-to-prescription generator. Doctors can speak naturally in Tamil, English, or a mix of both. The system converts voice to text, uses AI to detect possible transcription errors, requests doctor approval before making corrections, structures the prescription, and generates a professional PDF.

**Tagline:** Speak. Review. Prescribe.

## Target Users
- Doctors conducting live patient consultations.

## Core Workflow
1. **Enter Details:** Doctor enters and saves their details, then enters patient details.
2. **Speak:** Doctor dictates the prescription naturally using the voice interface.
3. **Review AI Suggestions:** AI checks for errors and suggests corrections for doctor approval.
4. **Preview Prescription:** A structured, A4-style professional prescription is generated.
5. **Final Actions:** Doctor can Print, Download as PDF, or Send via WhatsApp.

## Functional Requirements
- **Doctor Details Management:** 
  - Fields: Doctor Name, Qualification, Medical Registration Number, Clinic Name, Clinic Address, Clinic Phone Number.
  - Option to "Remember Doctor Details on this device".
- **Patient Details Management:** 
  - Fields: Patient Name, Age, Gender, WhatsApp Number, Date.
  - The current date is displayed automatically.
- **Voice Prescription Interface:**
  - Language Selector: Auto Detect (default), தமிழ், English, Tamil + English.
  - Prominent circular microphone button (Start Speaking / Listening...).
  - Microphone pulse animation when active.
  - Stop Speaking button when recording.
  - Live Transcription text area supporting Tamil Unicode, English, and mixed content.
  - Manual text editing capabilities.
- **AI Review System:**
  - AI identifies possible speech recognition and spelling errors.
  - Displays suggestions as individual cards (showing Original, Suggested, and Reason).
  - Explicit buttons for "Accept Change" and "Keep Original".
  - Clear visual distinction between original and suggested text.
- **Prescription Structure and Preview:**
  - Generates an in-page, professional A4-style layout.
  - Contains Clinic info, Doctor info, Patient info, Symptoms/Diagnosis, and Rx Medicines.
  - **Medicine Schedule Table:** Columns for Medicine, Morning, Afternoon, Evening, and Duration. Must use full text (e.g., "Before Food" not "BF") and support Tamil labels (மருந்து, காலை, மதியம், இரவு, கால அளவு, உணவுக்கு முன், உணவுக்குப் பிறகு).
  - Doctor Advice section (bulleted list).
  - Follow-up instructions (displayed only if provided).
  - Placeholders for Doctor Signature and Clinic Seal at the bottom.
- **Export and Action Bar:**
  - Sticky/visible action bar below the preview.
  - **Print:** Prints the A4 layout.
  - **Download PDF:** Downloads the prescription to the device.
  - **Send via WhatsApp:** Opens a modal to confirm the number and displays a pre-filled text message. Opens WhatsApp directly from the device.

## User Interface Requirements
- Clean, minimal, premium healthcare interface.
- Soft white background with subtle blue and teal healthcare accents.
- Modern typography, rounded cards, soft shadows, clean spacing, and minimal icons.
- Two-column form layout for desktop, single-column for mobile.
- Responsive design adapting to desktop, tablet, and mobile screens.

## Application Header
- Left side: MediScribe logo icon, "MediScribe" text, and the tagline "Speak. Review. Prescribe."
- Right side: Language indicator, Help icon.

## Product Behavior Constraints
- **AI Limitations:** AI must strictly act as an assistant. It does NOT prescribe medicines, recommend dosages, or diagnose patients. It only detects transcription/spelling errors.
- **Doctor Authority:** Every important correction requires the doctor's explicit approval. Never visually imply AI corrections are automatically applied.

## Privacy Requirements
- **Privacy First:** Prescription and patient information are NOT permanently stored by MediScribe.
- Only doctor profile details are stored locally on the device (communicated via a privacy message).
- A subtle privacy indicator must exist near the footer.

## Out of Scope
- Login, Signup, Pricing, or Profile menus.
- Complex admin dashboard or database management UI.
- Patient history or recent prescriptions tracking.
- Patient search functionality.
- Analytics or charts.
- Excessive animations.

## Technical Risks and Considerations
- **Multilingual Speech Recognition:** Accurately capturing a mix of Tamil and English medical terminology in real-time requires a robust Speech-to-Text engine.
- **PDF Generation & Fonts:** Ensuring Tamil Unicode fonts render correctly when converting HTML to PDF locally on the client's device.
- **Text-to-Table Structuring:** Converting raw approved transcription text reliably into a structured Medicine Schedule Table may require an additional lightweight parsing or AI-structuring step before rendering the preview.

## Clarifications Required
- Is there a preferred third-party provider for the Speech-to-Text and AI Review engines (e.g., OpenAI, Google Cloud, AWS), or should the browser's native Web Speech API be utilized?
- Is there a preferred PDF generation library (e.g., `jspdf`, `html2pdf.js`) to handle the client-side export?
