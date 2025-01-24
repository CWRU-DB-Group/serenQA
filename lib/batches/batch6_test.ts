import {Question} from "@/components/Batch";

export const batch6_test: Question[] = [
  {
    "question_number": 1,
    "qid": -1,
    "text": "List the proteins that are annotated in the pathway Bosutinib Inhibition of BCR-ABL, are associated with glomerulosclerosis, and are compiled as interacting with IRS4.",
    "category": "urinary system disease:nephritis",
    "llm_ranking": [
      {
        "entity_name": "MTOR",
        "llm-average": 8.6
      },
      {
        "entity_name": "CRK",
        "llm-average": 4.9
      },
      {
        "entity_name": "GRB2",
        "llm-average": 4.5
      }
    ]
  },
  {
    "question_number": 2,
    "qid": -2,
    "text": "Which proteins are curated as interacting with GLOD4, which is associated with hepatocellular carcinoma and is detected in pathology samples of kidney cancer?",
    "category": "cancer:carcinoma",
    "llm_ranking": [
      {
        "entity_name": "BCL2L1",
        "llm-average": 8.8
      },
      {
        "entity_name": "LTB4R2",
        "llm-average": 8.2
      },
      {
        "entity_name": "SCLT1",
        "llm-average": 5.9
      },
      {
        "entity_name": "MAX",
        "llm-average": 5.8
      }
    ]
  },
]