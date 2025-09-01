// // when using en.json file format
// {
//     "welcomeMessage": "Welcome"
// }


const en = {
  home: {
    hero: {
      new20Tag: "New: 20 Specialized GPTs",
      title: "Legal Assistant with AI for Bolivia",
      description:
        "Access 20 GPTs specialized in Bolivian law. Chat with legal experts and generate professional documents in minutes.",
      getStartedButton: "Get started",
      seePricesButton: "See Prices",
      safeConfidential: "Safe and Confidential",
      designedFOrLawyers: "Designed for Lawyers",
      profLegalDocs: "Professional Legal DOcuments",
      demoChat: {
        chatTitle: "Legal Assistant",
        lawName: "Bolivian Civil Law",
        userPrompt: "I need to draft a lease for a property in Santa Cruz.",
        botAnswer:
          "I'd be happy to help you. Based on the Bolivian Civil Code, I'll prepare a lease agreement for you that includes all the necessary clauses.",
        generatedContract: "Generated Contract",
      },
    },
    features: {
      title: "Main Features",
      description: "Everything you need to take your legal practice to the next level",
      popular: "Popular",
      new: "New",
      feature1: {
        title: "20 Specialized GPTs",
        description: "Access experts in civil, criminal, labor, tax, and other areas of Bolivian law."
      },
      feature2: {
        title: "Document Generation",
        description: "Create professionally formatted contracts, lawsuits, deeds, and other legal documents."
      },
      feature3: {
        title: "Security and Confidentiality",
        description: "Your conversations and documents are protected with enterprise-grade encryption."
      },
      feature4: {
        title: "Quick Responses",
        description: "Get accurate legal answers in seconds, not hours or days."
      },
      feature5: {
        title: "Designed for Professionals",
        description: "Tool optimized for lawyers, students, and legal professionals."
      },
      feature6: {
        title: "Updated with Bolivian Laws",
        description: "Knowledge base updated with the most recent Bolivian legislation and jurisprudence."
      },
      whyChooseSection: {
        title: "Why choose Legal Corp AI",
        description: "Our platform is designed specifically for the Bolivian market, with up-to-date local knowledge and tools that adapt to your needs.",
        feature1: "Knowledge base specialized in Bolivian law",
        feature2: "Documents in standard Bolivian legal format",
        feature3: "Spanish support and local customer service",
      }
    },
    testimonials: {
      title: "What Our Users Say",
      description: "Discover how Legal Corp AI is transforming legal practice in Bolivia.",
      testimonial1: {
        name: "Dr. Carlos Mendoza",
        role: "Criminal Lawyer",
        company: "Mendoza & Associates Law Firm",
        content: "Legal Corp AI has revolutionized my practice. I can now generate documents and obtain legal advice in minutes, not hours. The precision in Bolivian law is impressive."
      },
      testimonial2: {
        name: "Lic. Gabriela Rojas",
        role: "Corporate Lawyer",
        company: "Legal Solutions SRL",
        content: "As a corporate lawyer, I require speed and precision. This platform allows me to draft complex contracts with the confidence that they comply with current Bolivian legislation."
      },
      testimonial3: {
        name: "Dr. Luis Fernández",
        role: "University Professor",
        company: "University of San Andrés",
        content: "I use Legal Corp AI to prepare my classes and help my students. It's an invaluable educational tool that keeps legal knowledge up to date."
      },
      testimonial4: {
        name: "Lic. Ana Paula Vargas",
        role: "Labor Lawyer",
        company: "Labor Legal Consulting",
        content: "The specialization in Bolivian labor law is excellent. It has saved me countless hours of research and allows me to better serve my clients."
      },
      activeLawyers: "Active Lawyers",
      generatedDocuments: "Generated Documents",
      satisfaction: "Satisfaction",
      supportAvailable: "Support Available"
    },
    pricing: {
      title: "Plans for Every Need",
      description: "Choose the perfect plan for your law practice. Upgrade or cancel anytime.",
      seeAllPlans: "See All Plans",
      doUNeedCustmizedPlan: "Do you need a customized plan for your company?",
      contactSalesButton: "Contact Sales"
    }
  },
  header: {
    navLinks: {
      home: "Home",
      catalog: "Catalog",
      prices: "Prices",
      myAccount: "My Account",
    },
    login: "Login",
    register: "Register",
    logOut: "Log out",
  },
  footer: {
    description: "AI-powered legal assistant specializing in Bolivian law. Access 20 specialized GPTs and generate legal documents with confidence.",
    safeAndConfidential: "Safe and Confidential",
    allRightsReserved: "All rights reserved",
    product: {
      title: "Product",
      features: "Features",
      GPTCatalog: "GPT Catalog",
      prices: "Prices",
      documentation: "Documentation"
    },
    enterprise: {
      title: "Enterprise",
      aboutUs: "About Us",
      contact: "Contact",
      blog: "Blog",
      racing: "Racing"
    },
    legal: {
      title: "Legal",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      legalNotice: "Legal Notice"
    },
    medium: {
      title: "Medium",
      helpCenter: "Help Center",
      FAQ: "FAQ",
      technicalSupport: "Technical Support",
      systemStatus: "System Status"
    }
  },
  login: {
    title: "Login",
    description: "Enter your credentials to access your account",
    footerText1: {
      text: "Don't have an account?",
      linkName: "Sign up"
    },
    footerText2: {
      text: "Forgot your password?",
      linkName: "Recover it"
    },
  },
  signup: {
    title: "Create Account",
    description: "Create your account to start using Legal Corp AI",
    footerText: {
      text: "Already have an account?",
      linkName: "Sign in"
    },
  },
  forgot: {
    title: "Recover Password",
    description: "We will send you a link to recover your password.",
    footerText: {
      text: "Forgot your password?",
      linkName: "Sign in"
    },
  },
  authForm: {
    fullName: {
      label: "Full Name",
      placeholder: "john doe",
      name2CHarLongError: "Name must be at least 2 characters long",
    },
    email: {
      label: "Email",
      placeholder: "john@example.com",
      invalidEmailFormatError: "Invalid email format"
    },
    password: {
      label: "Password",
      placeholder: "",
      pwdMustbe8LongError: "Password must be at least 8 characters long",
      atLeast1UpperCaseLaterError: "Must contain at least one uppercase letter",
      atLeast1LowerCaseLaterError: "Must contain at least one lowercase letter",
      atLeast1NumberError: "Must contain at least one lowercase letter",
      passwordMustContainWarn: "Password must contain",
      min8CharWarn: "Minimum 8 characters",
      atLeast1UpperCaseLaterWarn: "At least one uppercase letter",
      atLeast1LowerCaseLaterWarn: "At least one lowercase letter",
      atLeast1NumberWarn: "At least one number",
    },
    confirmPassword: {
      title: "Confirm Password",
      placeholder: "",
      passowrdDoNotMatchError: "Passwords do not match"
    }
  },
  catalog: {
    hero: {
      title: "Catalog of Specialized GPTs",
      description: "Access {count} legal assistants specialized in Bolivian law.",
      yourCurrentPlan: "Your current plan",
      freePlanName: "Free",
      proPlanName: "Pro",
      upgradeToPro: "Upgrade to Pro",
    },
    searchFilter: {
      searchPlaceholder: "Search for specialized GPTS...",
      filters: "Filters"
    },
    gptsSection: {
      title: "{count, plural, one {# Legal Assistant} other {# Legal Assistants}}",
      chatButton: "Chat"
    },
    unlockSuggestionSection: {
      title: "Unlock all specialized GPTs",
      description: "Upgrade to the Pro plan to access all 20 specialized GPTs and enjoy advanced features like document export and priority support.",
      seePlans: "See Plans"
    }
  },
  pricing: {
    hero: {
      title: "Plans for Every Legal Need",
      description: "Choose the perfect plan for your legal practice. From solo practitioners to full-service law firms."
    },
    comparison: {
      title: "Detailed Comparison",
      description: "Find the perfect plan by comparing all the features",
      comparisonTable: {
        title: "Feature Comparison",  
        featureTHead: "Feature"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Everything you need to know about our plans"
    },
    readyToTransformSection: {
      title: "Ready to Transform Your Legal Practice?",
      description: "Join hundreds of lawyers in Bolivia who are already using Legal Corp AI to improve their productivity and better serve their clients.",
      getStartedButton: "Get Started",
      contactSalesButton: "Contact Sales"
    }
  },
  account: {
    mainTitle: {
      title: "My Account",
      description: "Manage your profile, subscription and preferences",
    },
    sidebar: {
      buttons: {
        profile: "Profile",
        security: "Security",
        notifications: "Notifications",
        billing: "Billing",
        logOut: "Log Out"
      },
      profile: {
        saveChangesButton: "Save Changes",
        saving: "Saving...",
        personalInformation: {
          title: "Personal Information",
          description: "Update your personal information and account preferences"
        },
        basicInformation: {
          title: "Basic Information",
          fullName: {
            label: "Full Name",
            placeholder: "John Doe",
          },
          email: {
            label: "Email",
            placeholder: "john@example.com",
          },
          telephone: {
            label: "Telephone",
            placeholder: "+591 70000000",
          },
          language: {
            label: "Language",
            placeholder: "spanish",
          }
        },
        addressInformation: {
          title: "Address Information",
          address: {
            label: "Address",
            placeholder: "Av. Principal #123"  
          },
          city: {
            label: "City",
            placeholder: "La Paz"  
          },
          country: {
            label: "Country",
            placeholder: "Bolivia"  
          },
        },
        notificationPreferences: {
          title: "Notification Preferences",
          description: "Configure how you want to receive notifications from our platform",
          emailNotification: {
            title: "Email Notifications",
            description: "Receive important notifications about your account",
          },
          smsNotification: {
            title: "SMS notifications",
            description: "Receive important alerts by text message"
          },
          marketingEmails: {
            title: "Emails de Marketing",
            description: "Receive updates on new features and promotions"
          }
        }
      },
      notifications: {
        title: "Notification Preferences",
        description: "Configure how and when to receive notifications",
        emailNotifications: {
          title: "Email Notifications",
          accountUpdates: {
            title: "Account Updates",
            description: "Important changes to your account"
          },
          invoicesAndPayments: {
            title: "Invoices and payments",
            description: "Notifications about invoices and payments"
          },
          productUpdates: {
            title: "Product Updates",
            description: "New features and improvements"
          }
        },
        pushNotifications: {
          chatMessages: {
            title: "Chat messages",
            description: "Notifications about new answers"
          },
          generatedDocuments: {
            title: "Generated documents",
            description: "When your documents are ready"
          }
        }
      },
      billing: {
        title: "Billing Information",
        planActual: "Plan Actual",
        updatePlan: "Update Plan",
        nextPayment: "Next payment",
        subscribe: "Subscribe",
        unsubscribe: "Unsubscribe",
        paymentMethod: "Payment Method",
        expires: "Expires",
        update: "Update"
      }
    }
  },
  chat: {
    sidebar: {
      conversations: "Conversations",
      searchPlaceholder: "Search conversations...",
      noContent: {
        title: "There are no conversations",
        description: "Start a new conversation"
      }
    },
    conversationBox: {
      conversation: "Conversation",
      startaConversation: "Start a conversation",
      sendAMessageToStart: "Send a message to start chatting with the paralegal"
    }
  },
};

export default en;
