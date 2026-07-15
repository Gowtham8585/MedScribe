# Phase 1: Project Foundation and UI Shell

## Objective
Set up the core project layout, styling system, application header, and responsive container structure.

## Requirements Covered
- User Interface Requirements
- Design Requirements
- Application Header

## Features to Implement
- Soft white background with subtle blue and teal healthcare accents.
- Modern typography, rounded cards, and clean spacing system.
- Top navigation header containing the logo, title, tagline, language indicator, and help icon.
- Main single-page application container (centered, maximum-width).

## Frontend Tasks
- Initialize project and define global CSS variables/design tokens.
- Build the `Header` layout and styling.
- Create the main `Workspace` grid/flex layout responsive to mobile, tablet, and desktop.
- Set up a generic `Card` UI component for future sections.

## Backend Tasks
- None (Client-side only).

## API and Integration Tasks
- None.

## Components and Modules
- `AppLayout`
- `Header`
- `Card` (Reusable UI Wrapper)

## Files Expected to Create or Modify
- `index.html`
- `src/styles/globals.css` (or equivalent)
- `src/components/Header.jsx`
- `src/components/Layout.jsx`
- `src/components/Card.jsx`

## Dependencies
- Initialized frontend framework (e.g., Vite/React).

## Validation Rules
- None for this phase.

## Error Handling
- None for this phase.

## Testing Checklist
- [ ] Header renders accurately on mobile and desktop.
- [ ] Global styling reflects a premium healthcare interface.
- [ ] Tagline is visible and positioned correctly.

## Completion Criteria
- An empty, fully styled shell of the application is visible and responsive.

## Features Explicitly Not Implemented in This Phase
- Data entry forms, Voice processing, AI Review, PDF Generation.

---

# Phase 2: Doctor and Patient Details Data Entry

## Objective
Implement the Doctor Details and Patient Details cards, including local storage persistence for the doctor's profile.

## Requirements Covered
- Doctor Details Management
- Patient Details Management
- Privacy Requirements

## Features to Implement
- Doctor Details form (Name, Qualification, Registration, Clinic info).
- "Remember Doctor Details on this device" checkbox and logic.
- Privacy messages and footer indicator.
- Patient Details form (Name, Age, Gender, WhatsApp Number) with auto-filled Date.

## Frontend Tasks
- Build specialized form inputs (text, numbers, selectors).
- Implement local storage hooks/logic to save and load Doctor details.
- Build the two-column (desktop) to single-column (mobile) form layout.

## Backend Tasks
- None.

## API and Integration Tasks
- Browser `localStorage` API.

## Components and Modules
- `Input`, `Checkbox`
- `DoctorDetailsForm`
- `PatientDetailsForm`
- `PrivacyFooter`
- `useLocalStorage` hook

## Files Expected to Create or Modify
- `src/components/DoctorDetailsForm.jsx`
- `src/components/PatientDetailsForm.jsx`
- `src/components/PrivacyFooter.jsx`
- `src/hooks/useLocalStorage.js`

## Dependencies
- Phase 1 (UI Shell and `Card` component).

## Validation Rules
- Required fields for final prescription generation should be managed in state.

## Error Handling
- Handle invalid local storage parsing safely.

## Testing Checklist
- [ ] Checking "Remember Doctor Details" saves data across page reloads.
- [ ] Patient date auto-fills with the current date.
- [ ] Layout transitions properly from two-column to single-column on smaller screens.
- [ ] Privacy messages are clearly visible.

## Completion Criteria
- User can input details, and doctor data securely persists locally.

## Features Explicitly Not Implemented in This Phase
- Voice Transcription, AI Review, Prescription Preview, Exports.

---

# Phase 3: Voice Prescription Interface

## Objective
Implement the audio recording UI and the live transcription text area.

## Requirements Covered
- Voice Prescription Interface

## Features to Implement
- Language selector dropdown (Auto Detect, Tamil, English, Tamil+English).
- Large circular Microphone button (Start Speaking / Listening...).
- Pulse animation while listening.
- Live Transcription text area supporting mixed English/Tamil Unicode editing.

## Frontend Tasks
- Build Language Selector dropdown.
- Build animated Microphone button.
- Build editable Text Area.
- Wire up Speech-to-Text logic to capture audio and output text to the text area.

## Backend Tasks
- None.

## API and Integration Tasks
- Speech-to-Text Integration (Browser Native Web Speech API or custom provider).

## Components and Modules
- `VoicePrescriptionSection`
- `LanguageSelector`
- `MicrophoneButton`
- `LiveTranscriptionArea`
- `useSpeechRecognition` hook/service

## Files Expected to Create or Modify
- `src/components/VoicePrescriptionSection.jsx`
- `src/hooks/useSpeechRecognition.js`

## Dependencies
- Phase 1 (UI Shell).

## Validation Rules
- Text area must reliably handle Unicode formatting without breaking layout.

## Error Handling
- Handle microphone permission denied errors with clear user feedback.
- Graceful degradation if the browser lacks native speech support.

## Testing Checklist
- [ ] Microphone button toggles recording state and pulses.
- [ ] Spoken words transcribe into the text box.
- [ ] Doctor can click into the text box and manually type/edit.

## Completion Criteria
- Audio input is successfully captured and converted to editable text on screen.

## Features Explicitly Not Implemented in This Phase
- AI suggestion cards, Prescription table structuring.

---

# Phase 4: AI Review System

## Objective
Integrate the AI system to scan the transcribed text, detect errors, and present actionable correction cards to the doctor.

## Requirements Covered
- AI Review System
- Product Behavior Constraints

## Features to Implement
- "Review Prescription" trigger button.
- AI Review section displaying an AI sparkle icon and safety messages.
- Suggestion Cards displaying Original, Suggested, and Reason.
- "Accept Change" and "Keep Original" interactive buttons.
- State logic to update the main transcription upon accepting changes.

## Frontend Tasks
- Build `SuggestionCard` UI.
- Implement state tracking for pending, accepted, and rejected suggestions.
- Implement text-replacement logic when a suggestion is accepted.

## Backend Tasks
- None (Direct API call or Serverless function proxy if hiding API keys is necessary).

## API and Integration Tasks
- AI Provider API Integration (e.g., OpenAI or generic LLM API) formatted to return JSON suggestion arrays.

## Components and Modules
- `AIReviewSection`
- `SuggestionCard`
- `AIService` (API Caller)

## Files Expected to Create or Modify
- `src/components/AIReviewSection.jsx`
- `src/components/SuggestionCard.jsx`
- `src/services/aiService.js`

## Dependencies
- Phase 3 (Requires the transcribed text string as input).

## Validation Rules
- AI must strictly act as an assistant (enforced via prompt engineering in the API call).

## Error Handling
- Handle AI timeouts, rate limits, or network errors, allowing the doctor to manually bypass the review.

## Testing Checklist
- [ ] Clicking "Review" generates valid suggestion cards (or reports no errors).
- [ ] Accepting a change visibly updates the main transcription text.
- [ ] Safety messages stating "Changes are applied only after doctor approval" are visible.

## Completion Criteria
- Doctor can review, accept, or reject AI-generated spelling/transcription corrections.

## Features Explicitly Not Implemented in This Phase
- The final structured table preview, Printing, PDF Export.

---

# Phase 5: Structured Prescription Preview

## Objective
Convert the final approved text and user details into a professional A4-style rendered document.

## Requirements Covered
- Prescription Structure and Preview
- Medicine Schedule Table

## Features to Implement
- A4 proportioned white card mimicking a physical page.
- Header with Doctor/Clinic details.
- Patient details row.
- Symptoms / Diagnosis section.
- Medicine Schedule Table (Morning, Afternoon, Evening, Duration) with Tamil label support and full text values (Before Food/After Food).
- Advice and Follow-up sections.
- Signature and Seal placeholders at the bottom.

## Frontend Tasks
- Build `PrescriptionPreview` layout container.
- Build `MedicineTable` component capable of receiving structured JSON data.
- **Data Parsing:** Implement logic (potentially via a secondary fast AI call) to extract structured medicines, advice, and symptoms from the finalized free-text block.

## Backend Tasks
- None.

## API and Integration Tasks
- Optional secondary AI call to structure free text into strict JSON for the table.

## Components and Modules
- `PrescriptionPreview`
- `MedicineTable`
- `PrescriptionHeader`

## Files Expected to Create or Modify
- `src/components/PrescriptionPreview.jsx`
- `src/components/MedicineTable.jsx`
- `src/utils/textToTableParser.js`

## Dependencies
- Phase 2 (Doctor/Patient details state).
- Phase 4 (Final approved transcription state).

## Validation Rules
- Empty sections (e.g., Follow-up) must not render empty titles; they should be hidden.
- Table columns must not use acronyms (BF/AF).

## Error Handling
- Handle cases where the parser fails to structure the text properly, falling back to a raw text block display if necessary.

## Testing Checklist
- [ ] Document correctly displays Doctor and Patient details.
- [ ] Medicine table renders cleanly with English or Tamil headers.
- [ ] Document fits A4 aspect ratio proportions on desktop.

## Completion Criteria
- A fully formatted, professional prescription is visually generated on the screen.

## Features Explicitly Not Implemented in This Phase
- PDF generation, Printing, WhatsApp messaging.

---

# Phase 6: Export and Action Bar

## Objective
Implement the final action bar allowing the doctor to export and share the generated prescription.

## Requirements Covered
- Export and Action Bar

## Features to Implement
- Sticky Action Bar UI containing Print, Download PDF, and Send via WhatsApp buttons.
- Print functionality mapped to browser print dialogue.
- PDF generation library integration.
- WhatsApp modal with number verification and pre-filled message text.

## Frontend Tasks
- Build `ActionBar` component.
- Build `WhatsAppModal` component.
- Configure CSS `@media print` rules to only print the A4 `PrescriptionPreview` container and hide the rest of the app.
- Implement HTML-to-PDF client-side generation.

## Backend Tasks
- None.

## API and Integration Tasks
- Client-side PDF Library (e.g., `html2pdf.js` or `jsPDF`).
- WhatsApp deep-linking (`https://wa.me/{number}?text={message}`).

## Components and Modules
- `ActionBar`
- `WhatsAppModal`
- `pdfExportService`

## Files Expected to Create or Modify
- `src/components/ActionBar.jsx`
- `src/components/WhatsAppModal.jsx`
- `src/services/pdfExportService.js`
- `src/styles/print.css`

## Dependencies
- Phase 5 (The visual A4 DOM must be fully rendered and populated).

## Validation Rules
- WhatsApp number input must be validated before allowing the link to open.

## Error Handling
- Handle PDF generation failure gracefully with user alerts.

## Testing Checklist
- [ ] "Print" triggers the browser print dialog displaying ONLY the A4 prescription.
- [ ] "Download PDF" generates a file retaining formatting and Tamil Unicode fonts.
- [ ] "WhatsApp" opens a modal, previews the correct text, and opens the WhatsApp application/web correctly.

## Completion Criteria
- The doctor can successfully print, download, and initiate a WhatsApp share for the finalized prescription.

## Features Explicitly Not Implemented in This Phase
- None. This is the final phase of the core application.
