export type Category = {
  batch_id: number;
  batch_name: string;
  total: number;
  categories: {
    [key: string]: {
      [key: string]: number
    };
  };
}

const category: Category[] = [
  {
    "batch_id": 1,
    "batch_name": "Cancer and neoplasm-related abnormalities (1)",
    "total": 349,
    "categories": {
      "cancer": {
        "organ system cancer": 349
      }
    }
  },
  {
    "batch_id": 2,
    "batch_name": "Cancer and neoplasm-related abnormalities (2)",
    "total": 126,
    "categories": {
      "cancer": {
        "carcinoma": 65,
        "reproductive organ cancer": 30,
        "None": 10,
        "head and neck cancer": 6,
        "endocrine gland cancer": 5,
        "cell type cancer": 3,
        "malignant adenoma": 1,
        "melanoma": 1,
        "nervous system cancer": 1,
        "sarcoma": 1
      },
      "Neoplasm": {
        "None": 2,
        "Hematological neoplasm": 3
      }
    }
  },
  {
    "batch_id": 3,
    "batch_name": "Cardiovascular and Hematologic Diseases (1)",
    "total": 313,
    "categories": {
      "Abnormality of the cardiovascular system": {
        "Syncope": 313
      }
    }
  },
  {
    "batch_id": 4,
    "batch_name": "Cardiovascular and Hematologic Diseases (2)",
    "total": 242,
    "categories": {
      "Abnormality of the cardiovascular system": {
        "Abnormal systemic blood pressure": 105,
        "Abnormality of cardiovascular system electrophysiology": 53,
        "Abnormality of the vasculature": 18,
        "Abnormality of blood circulation": 11,
        "Abnormality of the vasculature of the eye": 10,
        "Abnormality of cardiovascular system morphology": 6,
        "Acute coronary syndrome": 4,
        "None": 4,
        "Abnormal heart morphology": 4,
        "Angina pectoris": 2,
        "Abnormal cardiovascular system physiology": 2,
        "Abnormal heart valve physiology": 1
      },
      "cardiovascular system disease": {
        "benign vascular tumor": 6,
        "artery disease": 4,
        "heart disease": 1,
        "cardiomyopathy": 1,
        "pericarditis": 1,
        "hypertensive heart disease": 1,
        "None": 1
      },
      "hematopoietic system disease": {
        "normocytic anemia": 1,
        "pancytopenia": 1
      },
      "Abnormality of blood and blood-forming tissues": {
        "Anemia": 1,
        "Venous thrombosis": 1,
        "Abnormal platelet count": 1,
        "Abnormality of the coagulation cascade": 1,
        "Abnormality of multiple cell lineages in the bone marrow": 1
      }
    }
  },
  {
    "batch_id": 5,
    "batch_name": "Musculoskeletal, Growth, and Connective Tissue Disorders",
    "total": 39,
    "categories": {
      "musculoskeletal system disease": {
        "bone disease": 22,
        "muscle tissue disease": 2,
        "lipodystrophy": 2,
        "None": 1
      },
      "Abnormality of the musculoskeletal system": {
        "Abnormality of skeletal morphology": 8,
        "Abnormal muscle physiology": 2
      },
      "Growth abnormality": {
        "Decreased body weight": 1
      }
    }
  },
  {
    "batch_id": 6,
    "batch_name": "Immune System Disorders",
    "total": 58,
    "categories": {
      "Abnormality of the immune system": {
        "Abnormal cellular immune system morphology": 25,
        "Abnormal inflammatory response": 16,
        "Immunologic hypersensitivity": 4,
        "Immunodeficiency": 2,
        "Autoimmunity": 1
      },
      "immune system disease": {
        "None": 3,
        "gastrointestinal allergy": 1,
        "allergic disease": 1,
        "complement deficiency": 1,
        "hypersensitivity reaction disease": 1,
        "autoimmune disease": 1
      }
    }
  },
  {
    "batch_id": 7,
    "batch_name": "Respiratory Diseases",
    "total": 8,
    "categories": {
      "respiratory system disease": {
        "None": 4,
        "bronchial disease": 1,
        "lower respiratory tract disease": 1,
        "respiratory system benign neoplasm": 1,
        "lung disease": 1
      },
      "Abnormality of the respiratory system": {
        "Abnormal pattern of respiration": 1
      }
    }
  },
  {
    "batch_id": 8,
    "batch_name": "Digestive, Metabolic, and Endocrine Disorders",
    "total": 54,
    "categories": {
      "gastrointestinal system disease": {
        "liver disease": 10,
        "biliary tract disease": 3,
        "gastritis": 2,
        "functional gastric disease": 2,
        "hepatobiliary disease": 1,
        "rectal disease": 1,
        "intestinal disease": 1,
        "inflammatory bowel disease": 1,
        "cryptosporidiosis": 1,
        "colonic disease": 1
      },
      "Abnormality of the digestive system": {
        "Abdominal symptom": 4,
        "Abnormality of the liver": 3,
        "Abnormality of digestive system physiology": 2,
        "Abnormality of the pancreas": 1,
        "Abnormality of the gastrointestinal tract": 1,
        "Abnormality of digestive system morphology": 1
      },
      "disease of metabolism": {
        "carbohydrate metabolism disease": 2,
        "None": 1,
        "nutrition disease": 1
      },
      "endocrine system disease": {
        "pancreatitis": 2,
        "adrenal cortex disease": 1,
        "thyroid gland disease": 1,
        "pituitary gland disease": 1
      },
      "Abnormality of metabolism/homeostasis": {
        "Abnormal blood ion concentration": 6,
        "Abnormal glucose homeostasis": 4,
        "Abnormality of acid-base homeostasis": 1
      },
      "Abnormality of the endocrine system": {
        "Abnormality of thyroid physiology": 1
      }
    }
  },
  {
    "batch_id": 9,
    "batch_name": "Urinary and Reproductive System Diseases",
    "total": 93,
    "categories": {
      "urinary system disease": {
        "nephritis": 15,
        "kidney disease": 2,
        "kidney failure": 1,
        "cystitis": 1,
        "cystic kidney disease": 1,
        "obstructive nephropathy": 1,
        "urethral obstruction": 1,
        "proteinuria": 1
      },
      "reproductive system disease": {
        "ovarian disease": 24,
        "infertility": 2,
        "endometriosis": 1,
        "vulvovaginitis": 1,
        "None": 1,
        "prostate disease": 1
      },
      "Abnormality of the genitourinary system": {
        "Abnormality of the upper urinary tract": 29,
        "Abnormal reproductive system morphology": 3,
        "Abnormality of reproductive system physiology": 3,
        "Abnormality of the urinary system physiology": 2,
        "Abnormality of the lower urinary tract": 2,
        "Abnormality of the genital system": 1
      }
    }
  },
  {
    "batch_id": 10,
    "batch_name": "Skin, Eye, and Sensory Disorders",
    "total": 14,
    "categories": {
      "integumentary system disease": {
        "skin disease": 2,
        "hypotrichosis": 1
      },
      "Abnormality of the integument": {
        "Abnormality of skin morphology": 4,
        "Abnormal hair morphology": 1
      },
      "Abnormality of the eye": {
        "Abnormal anterior eye segment morphology": 1,
        "Abnormal posterior eye segment morphology": 1,
        "Abnormal uvea morphology": 1,
        "Glaucoma": 1
      },
      "Abnormality of the head": {
        "Abnormality of the mouth": 1
      }
    }
  },
  {
    "batch_id": 11,
    "batch_name": "Neurological and Mental Health Disorders",
    "total": 83,
    "categories": {
      "nervous system disease": {
        "neuropathy": 8,
        "eye disease": 6,
        "neurodegenerative disease": 4,
        "central nervous system disease": 3,
        "brain disease": 3,
        "peripheral nervous system disease": 1,
        "hemiplegia": 1,
        "sensory system disease": 1,
        "mitochondrial disorder affecting the nervous system":1
      },
      "Abnormality of the nervous system": {
        "Behavioral abnormality": 17,
        "Morphological central nervous system abnormality": 9,
        "Seizure": 8,
        "Encephalopathy": 1,
        "Abnormal peripheral nervous system morphology": 3,
        "Abnormality of movement": 4,
        "Abnormal central motor function": 3,
        "Abnormality of higher mental function": 2,
        "Abnormal cranial nerve physiology": 1,
        "Headache": 1
      },
      "disease of mental health": {
        "specific developmental disorder": 1,
        "personality disorder": 1,
        "substance abuse": 1,
        "psychotic disorder": 1,
        "mood disorder": 1,
        "substance dependence": 1
      }
    }
  },
  {
    "batch_id": 12,
    "batch_name": "Infectious Diseases",
    "total": 3,
    "categories": {
      "disease by infectious agent": {
        "parasitic protozoa infectious disease": 1,
        "viral infectious disease": 1,
        "None": 1
      }
    }
  },
  {
    "batch_id": 13,
    "batch_name": "Genetic diseases",
    "total": 131,
    "categories": {
      "genetic disease": {
        "autosomal genetic disease": 42,
        "carbohydrate metabolic disorder": 25,
        "chromosomal deletion syndrome": 24,
        "lipid metabolism disorder": 16,
        "X-linked monogenic disease": 10,
        "None": 5,
        "lysosomal storage disease": 4,
        "amino acid metabolic disorder": 2,
        "monogenic disease": 2,
        "vitamin metabolic disorder": 1
      }
    }
  },
  {
    "batch_id": 14,
    "batch_name": "Other Diseases",
    "total": 15,
    "categories": {
      "disease": {
        "disease of cellular proliferation": 1,
        "disease of anatomical entity": 1
      },
      "VACTERL association": {
        "None": 1
      },
      "chronic fatigue syndrome": {
        "None": 1
      },
      "Age of death": {
        "Stillbirth": 2
      },
      "others": {
        "None": 8
      },
      "Constitutional symptom": {
        "Chronic pain": 1
      }
    }
  }
]

export default category;