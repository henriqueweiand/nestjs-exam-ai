export const nonProcessedMessageMock = [
  {
    id: 'msg_iKpqjqfTDJ7krYnA3JYcWkuq',
    object: 'thread.message',
    created_at: 1741996239,
    assistant_id: 'asst_8MgiBil35dbhZwVrtFmerC0h',
    thread_id: 'thread_MylpO3O1rW79i1JaNxQVSlGa',
    run_id: 'run_rK4xoP7OBOVlf2V3pJIwllq0',
    role: 'assistant',
    content: [
      {
        type: 'text',
        text: {
          value:
            '{\n  "findings": [\n    {\n      "name": "Glucose",\n      "value": "86",\n      "unit": "mg/dL",\n      "normal_range": "70-99",\n      "group": "sugar"\n    },\n    {\n      "name": "Cholesterol Total",\n      "value": "201",\n      "unit": "mg/dL",\n      "normal_range": "\u003C190",\n      "group": "lipids"\n    },\n    {\n      "name": "Triglycerides",\n      "value": "56",\n      "unit": "mg/dL",\n      "normal_range": "\u003C150",\n      "group": "lipids"\n    },\n    {\n      "name": "Cholesterol HDL",\n      "value": "67",\n      "unit": "mg/dL",\n      "normal_range": "\u003E40",\n      "group": "lipids"\n    },\n    {\n      "name": "Cholesterol LDL",\n      "value": "119",\n      "unit": "mg/dL",\n      "normal_range": "\u003C130",\n      "group": "lipids"\n    },\n    {\n      "name": "Hemoglobin",\n      "value": "15.50",\n      "unit": "g/dL",\n      "normal_range": "13.30-16.50",\n      "group": "iron"\n    },\n    {\n      "name": "Urea",\n      "value": "56.0",\n      "unit": "mg/dL",\n      "normal_range": "12.8-42.8",\n      "group": "inflammation"\n    },\n    {\n      "name": "Alanine Amino Transferase (ALT)",\n      "value": "44",\n      "unit": "U/L",\n      "normal_range": "≤45",\n      "group": "liver enzymes"\n    },\n    {\n      "name": "Aspartate Amino Transferase (AST)",\n      "value": "54",\n      "unit": "U/L",\n      "normal_range": "≤40",\n      "group": "liver enzymes"\n    },\n    {\n      "name": "Creatinine",\n      "value": "1.03",\n      "unit": "mg/dL",\n      "normal_range": "0.50-1.00",\n      "group": "liver enzymes"\n    },\n    {\n      "name": "Vitamin D",\n      "value": "32.39",\n      "unit": "ng/mL",\n      "normal_range": "20.0-60.0",\n      "group": "urine"\n    },\n    {\n      "name": "Hemoglobin A1c",\n      "value": "4.7",\n      "unit": "%",\n      "normal_range": "\u003C5.7",\n      "group": "sugar"\n    }\n  ],\n  "summary": "The patient displays elevated cholesterol total, low urea levels, elevated AST, and creatinine values. Other parameters are within normal limits.",\n  "recommendations": "Consider dietary adjustments to lower cholesterol levels, maintain hydration and monitor kidney function, as well as regular exercise."\n}',
          annotations: [],
        },
      },
    ],
    attachments: [],
    metadata: {},
  },
  {
    id: 'msg_w1KL7lUjX2B53DcTapkruQfa',
    object: 'thread.message',
    created_at: 1741996234,
    assistant_id: null,
    thread_id: 'thread_MylpO3O1rW79i1JaNxQVSlGa',
    run_id: null,
    role: 'user',
    content: [
      {
        type: 'text',
        text: {
          value: 'Analyze this blood test report and summarize key findings.',
          annotations: [],
        },
      },
    ],
    attachments: [
      {
        file_id: 'file-W5p9PAdTjFKmzZniCa3NmU',
        tools: [
          {
            type: 'file_search',
          },
        ],
      },
    ],
    metadata: {},
  },
];
