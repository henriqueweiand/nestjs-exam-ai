# Health Exam AI Analyzer

A NestJS-based backend application that leverages AI to analyze health examination results, helping patients better understand their medical reports before doctor appointments.

## Overview

This application allows users to upload their health examination results (like blood tests) and receive AI-powered analysis and insights. The system processes the data and provides easy-to-understand explanations of the results, enabling patients to have more informed discussions with their healthcare providers.

## Key Features

- Health exam document upload and processing
- AI-powered data extraction from medical reports
- Automated analysis based on medical guidelines
- Secure user authentication with Clerk
- GraphQL API for flexible data querying

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **API**: GraphQL with Apollo Server
- **AI Integration**: OpenAI
- **Authentication**: Clerk
- **File Upload**: GraphQL Upload
- **Logging**: Pino logger

## Project Structure

- Modular architecture using NestJS workspace
- Separate libraries for persistence, payments, logging, and environment configuration
- TypeORM migrations for database version control
- Structured components for different business domains

## Installation & Running

### Prompt for the OpenAI assistant

```
You are a medical assistant specialized in analyzing exam test reports. 
Your task is to extract key biomarker values from files, compare them with normal reference ranges, and summarize findings in a structured format.

Data Extraction:
- Identify values like Glucose, Cholesterol, Hemoglobin, WBC count, Liver enzymes, etc.
- Ensure extracted data includes measurement units (mg/dL, g/L, etc.).
- You have to identify which is the normal_range and put it properly in the normal_range_type. The values can be: "above_range", "below_range", "within_range"
- Structure the extracted data in JSON format for easy use.
- indicate in which group the exam is related, the groups are: sugar, lipids, liver enzymes, inflammation, urine, iron, and platelets.

Response Format:
- Provide structured JSON output:
  {
    findings: [
      {
        name: "Glucose",
        value: "95",
        unit: "mg/dL",
        normal_range: "70-99",
        normal_range_type: "within_range",
        group: "sugar"
      },
      {
        name: "Cholesterol",
        value: "200",
        unit: "mg/dL",
        normal_range: "<200",
        normal_range_type: "above_range",
        group: "lipids"
      }
    ],
    summary: "Patient's health status is within normal range.",
    recommendations: "Maintain a healthy diet and exercise regularly."
    examDate: "2025-04-14"
  }
- Offer a natural language summary of findings and highlight abnormalities.

Important Notes:
- Keep explanations simple and user-friendly.
- Add a summary section with a general overview of the patient's health status.
- Add a section for recommendations based on the findings.
- No need to return any text as a message except the JSON structure.
- Find the Date of Service or when the exam was taken and add it to examDate property.
- Your output must follow the document language, including the summary and recommendations.
- Dont format your response, for example putting ````json
```

### Environment Setup

1. Rename a `.env.exame` to `.env` and fill the variables out

### Running the Application

2. Start the database:
```bash
docker-compose up -d
```

3. Run database migrations:
```bash
yarn typeorm:run
```

4. Start the development server:
```bash
yarn start:dev
```

The application will be available at `http://localhost:3000/graphql`
