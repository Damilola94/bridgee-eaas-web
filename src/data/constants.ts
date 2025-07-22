export const PAGE_SIZE = 20;
export const MIN_AGE = 18;

export const tableOfContentTC = [
  {
    title: "Introduction",
    href: "#introduction",
    id: 1
  },
  {
    title: "Benefits of this Platform",
    href: "#benefits-of-this-platform",
    id: 2
  },
  {
    title: "Transaction Dynamics of the Platform",
    href: "#transaction-dynamics-of-the-platform",
    id: 3
  },
  {
    title: "Responsibilities of the Purchaser",
    href: "#responsibilities-of-the-purchaser",
    id: 4
  },
  {
    title: "Responsibilities of the Vendor",
    href: "#responsibilities-of-the-vendor",
    id: 5
  },
  {
    title: "Logistics and Delivery",
    href: "#logistics-and-delivery",
    id: 6
  },
  {
    title: "Security Procedures",
    href: "#security-procedures",
    id: 7
  },
  {
    title: "Availability and Reversals",
    href: "#availability-and-reversals",
    id: 8
  },
  {
    title: "Restrictions on Use",
    href: "#restrictions-on-use",
    id: 9
  },
  {
    title: "Money Laundering and Terrorism Prohibition",
    href: "#money-laundering-and-terrorism-prohibition",
    id: 10
  },
  {
    title: "Indemnification",
    href: "#indemnification",
    id: 11
  },
  {
    title: "Limitation of Liability",
    href: "#limitation-of-liability",
    id: 12
  },
  {
    title: "Disclaimer of Warranties",
    href: "#indemnity",
    id: 13
  },
  {
    title: "Governing Law and Dispute Resolution",
    href: "#governing-law-dispute-resolution",
    id: 14
  },
  {
    title: "Miscellaneous",
    href: "#miscellaneous",
    id: 15
  },
  {
    title: "Contact",
    href: "#contact-us",
    id: 16
  }
];

export const navLinks = [
  { href: "/#features", label: "Features" },
  // { href: "#pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact us" }
];

const adminFaqs = [
  {
    "question": "How can I verify and approve loan requests?",
    "answer": "Go to the \"Loan\" section, review incoming loan requests, and select \"Approve\" or \"Reject\" based on the verification."
  },
  {
    "question": "How do I configure loan parameters to align with our cooperative's policies?",
    "answer": "Access the \"Loan Configuration\" in the \"Loan\" section to set terms, interest rates, and eligibility criteria."
  },
  {
    "question": "What steps should I follow to monitor the performance of approved loans?",
    "answer": "Visit the \"Loan\" section, select \"Loan Performance,\" and review details to track repayments and overall performance."
  },
  {
    "question": "How can I set my transaction pin for added security?",
    "answer": "In \"Security Settings,\" you can set your transaction pin to authenticate your transactions."
  },
  {
    "question": "What should I do if I forget my password and need to reset it?",
    "answer": "Visit the login page and use the \"Forgot Password\" option to reset your password via email or click on the change password feature on settings."
  },
  {
    "question": "How can I create an event as an admin?",
    "answer": "Navigate to the \"Communication\" section, select \"Events,\" and follow the prompts to create and schedule an event."
  },
  {
    "question": "Is there a limit to the number of events I can create?",
    "answer": "No, you can create as many events as needed for your cooperative. The system accommodates multiple events."
  },
  {
    "question": "How do I send out announcements to all cooperative members?",
    "answer": "In the \"Communication\" section, choose \"Announcements,\" and then create a new announcement with relevant details. It will be broadcasted to all members."
  },
  {
    "question": "Can I schedule announcements for a specific date and time?",
    "answer": "Yes, you can schedule announcements to go out at a later date and time, providing flexibility in communication planning."
  },
  {
    "question": "How frequently is the financial report updated in the \"Report Analytics\" feature?",
    "answer": "The \"Report Analytics\" feature is updated in real-time to provide the latest financial insights."
  },
  {
    "question": "Can I export the cooperative's statement of account for external use?",
    "answer": "Yes, the \"Report Analytics\" section allows you to download the cooperative's statement of account as a report."
  },
  {
    "question": "How do I initiate a fund transfer as an admin?",
    "answer": "In the \"Transactions\" section, choose \"Funds Transfer,\" input recipient details, including account information and transfer amount, then confirm to complete the transaction. However, this feature is only available to the initiator."
  },
  {
    "question": "How long does it take for a fund transfer to be completed?",
    "answer": "Transfers are usually immediate, and admins receive a confirmation once the transaction is completed."
  },
  {
    "question": "Is there a limit on the amount I can transfer to a member or external account?",
    "answer": "Yes, ensure you are aware of the daily transaction limits set on your Wema bank cooperative account. Contact the branch or call support at 0-7000-PURPLE, 080-3900-3700, for more enquiries."
  },
  {
    "question": "What information is required to initiate a fund transfer to an external account?",
    "answer": "Input the recipient's account information, including account details, transfer amount, narration, and bank details."
  },
  {
    "question": "How can I add a new beneficiary for quick fund transfers?",
    "answer": "Navigate to the \"Beneficiary\" section under \"Transactions,\" select \"Add Beneficiary,\" and follow the prompts to add and verify a new recipient."
  },
  {
    "question": "Is there a limit to the number of beneficiaries I can add?",
    "answer": "No, there's no fixed limit on the number of beneficiaries you can add for fund transfers."
  },
  {
    "question": "Where can I view a detailed history of all transactions made through the platform?",
    "answer": "Access the \"Transaction History\" section to view a comprehensive list of all transactions, including date, time, amount, and transaction details."
  },
  {
    "question": "Can I download the transaction history for accounting purposes?",
    "answer": "Yes, you can download the transaction history as a report for accounting and record-keeping. Look for the download option in the \"Transaction History\" section."
  },
  {
    "question": "How can I view the contribution history of cooperative members?",
    "answer": "Under \"Transactions,\" choose \"Contribution History\" to see a detailed record of all contributions made by members."
  },
  {
    "question": "Is there a filter for specific contribution details, like date or member name?",
    "answer": "Yes, utilize the search filter in the \"Contribution History\" section to find specific contributions based on date, member name, or other criteria."
  },
  {
    "question": "What steps should I follow to process a member's request to liquidate contributions?",
    "answer": "In the \"Contributions\" section, choose \"Liquidate Contribution Requests,\" review and process member requests by following the provided steps."
  },
  {
    "question": "Can I decline a liquidate contribution request, and how does the member get notified?",
    "answer": "Yes, you can decline a request. The system will automatically notify the member of the decision, providing transparency in the liquidation process."
  },
  {
    "question": "How are notifications sent to admins?",
    "answer": "Notifications are sent through the activity timeline bell icon and push notifications based on the user's preferences."
  }
];

export const listOfFAQAdmin = [
  {
    id: 1,
    topic: "Can I use a non-Wema bank account to onboard as an admin?",
    snippet:
      "No, the onboarding process is specific to Wema bank cooperative account holders. Contact support at 0-7000-PURPLE, 080-3900-3700, or visit the branch to open an account for your cooperative society. We can’t wait to have you onboard."
  },
  {
    id: 2,
    topic: "What if I forget my Admin password?",
    snippet:
      "Admins can use the Forgot Password link on the login page to reset their password."
  },
  {
    id: 3,
    topic: "How can I track specific transactions?",
    snippet:
      "Use the Transactions section in the navigation menu to access transaction history and apply filters."
  },
  {
    id: 4,
    topic: "Can I customize the information displayed on my dashboard?",
    snippet:
      "No, the dashboard content is predefined to provide essential information about the cooperative's operations."
  },
  {
    id: 5,
    topic: "How do I add new members to the cooperative?",
    snippet:
      "Navigate to the User section, and select Invite New Members. Fill in the necessary details and send invitations."
  },
  {
    id: 6,
    topic: "Can I remove a member who is no longer active in the cooperative?",
    snippet:
      "Yes, in the User section, choose the selected member and choose the action to deactivate member."
  },
  {
    id: 7,
    topic: "How do I resend an invitation to a member who hasn't responded?",
    snippet:
      "In the User Invite section, locate the member, and choose the option to resend the invitation."
  },
  {
    id: 8,
    topic:
      "Can I assign different roles to members, and what are their responsibilities?",
    snippet:
      "Yes, in User Management, you can assign roles like Initiator, Verifier, and Approver, each with specific transaction responsibilities."
  },
  ...(adminFaqs.map((item, index) => ({
    id: 9 + index,
    topic: item.question,
    snippet: item.answer
  })))
];

const faqMembers = [
  {
    "question": "How can I check the balance in my contribution account?",
    "answer": 'The "Dashboard" section provides an overview of your contribution balance and other financial aspects.'
  },
  {
    "question": "Is there a limit on the number of contributions I can make in a day? ",
    "answer": "While there is no limit on the number of contributions you can make, be aware to also pay attention to your cooperative guidelines."
  },
  {
    "question": "How can I request for a loan?",
    "answer": "You can request for a loan by clicking on the “Request for Loan” and selecting a loan option that suit your needs and that you are eligible for."
  },
  {
    "question": "Can I check the eligibility criteria for loan requests before applying?",
    "answer": "Yes, details on loan eligibility criteria are available in the \"Loan\" section for members' reference."
  },
  {
    "question": "What documents are required when uploading files for a loan request?",
    "answer": "Necessary identification documents and additional files may be required during the loan request process. Check specific loans to see documentation required from your cooperative administrator."
  },
  {
    "question": "How can I track the status of my loan request?",
    "answer": "Check the \"Loan\" section to view the status of your loan request and any updates."
  },
  {
    "question": "How do I withdraw my incentives, and how frequently are they distributed?",
    "answer": "Withdraw incentives through the \"Incentives\" section, and funds will be sent to the bank you registered on your mobile app. The frequency is dependent on your cooperative administration."
  },
  {
    "question": "Can I choose to reinvest my incentives back into the cooperative?",
    "answer": "Yes, members have the option to apply incentives to contributions or loan repayments."
  },
  {
    "question": "What should I do if I forget my password and need to reset it?",
    "answer": "Visit the login page and use the \"Forgot Password\" option to reset your password via email or click on the change password feature on settings."
  },
  {
    "question": "How do I update my personal information, such as my email or phone number?",
    "answer": "Access the \"Settings\" section to modify your profile details and ensure accurate information."
  },
  {
    "question": "Can I download my transaction history for record-keeping purposes?",
    "answer": "Yes, in the \"Transaction History\" section, you can download a detailed report of your financial transactions."
  },
  {
    "question": "Is there a search function in the transaction history for specific transactions?",
    "answer": "Absolutely, use the search filter in the \"Transaction History\" section to locate specific transactions by date, time, or amount."
  },
  {
    "question": "How often should I update my password for enhanced account security?",
    "answer": "It's advisable to update your password regularly. Access the \"Settings\" section to modify your password."
  },
  {
    "question": "What should I do if I suspect unauthorized access to my account?",
    "answer": "In the \"Settings\" section, you can change your password and contact support immediately to report any suspicious activity."
  },
  {
    "question": "Can I mute specific types of notifications to reduce app interruptions?",
    "answer": "Yes, customize your notification preferences in the \"Settings\" section to tailor alerts to your preferences."
  },
  {
    "question": "Can I receive notifications for specific events, like loan approvals or contributions?",
    "answer": "Customize your notification preferences in the \"Settings\" section to receive alerts for specific events."
  },
  {
    "question": "How do I withdraw funds from my virtual wallet to my bank account?",
    "answer": "Use the \"Withdraw\" option in the \"Virtual Wallet\" section to transfer funds from your virtual wallet to your linked bank account."
  },
  {
    "question": "Is there a limit on fund withdrawals from the wallet?",
    "answer": "Withdrawal limits depend on your KYC (Know Your Customer) levels. Upgrade your KYC level to increase your withdrawal limit."
  },
  {
    "question": "Why is KYC information necessary, and how do I ensure compliance?",
    "answer": "KYC information is crucial for security. Follow the steps in the \"KYC Information\" section to complete the verification process."
  },
  {
    "question": "What happens if there's a discrepancy in the KYC documents provided?",
    "answer": "The system will flag discrepancies, and you should follow the outlined process in the \"KYC Information\" section to address them."
  }
];

export const listOfFAQMember = [
  {
    id: 1,
    topic: "Can I join without a link from my cooperative society?",
    snippet:
      "No, membership is initiated through a link provided by the cooperative society."
  },
  {
    id: 2,
    topic: "Can I change my default password during onboarding?",
    snippet:
      "Yes, members can set up a new password during the onboarding process"
  },
  {
    id: 3,
    topic: "How do I view upcoming events on the mobile app?",
    snippet:
      "Access the Events section on the homescreen to view a list of upcoming events along with relevant details"
  },
  {
    id: 4,
    topic: "Where can I find announcements on the mobile app?",
    snippet:
      "The Announcements section on the homescreen displays all relevant announcements from the cooperative."
  },
  {
    id: 5,
    topic:
      "Is there a way to receive push notifications for new announcements?",
    snippet:
      "Yes, the mobile app sends push notifications for new announcements and events, ensuring timely communication with members."
  },
  {
    id: 6,
    topic: "How do I initiate a fund contribution from my mobile app?",
    snippet:
      "Navigate to the Contribution section, select the fund contribution, choose your funding method and follow the steps to make a contribution."
  },
  {
    id: 7,
    topic:
      "Is there an option to set up automatic recurring contributions to save time?",
    snippet:
      "Yes, members can schedule recurring contributions in the Contribution section. However, this feature is still under development."
  },
  {
    id: 8,
    topic: "How quickly are contributions reflected in my account balance?",
    snippet:
      "Contributions are updated in real-time, ensuring that your account balance is promptly adjusted."
  },
  ...(faqMembers.map((item, index) => ({
    id: 9 + index,
    topic: item.question,
    snippet: item.answer
  })))
];
