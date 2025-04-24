'use client';

import styles from './Departments.module.css';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const departments = [
  {
    name: 'AI Research & Development',
    description: 'Focuses on cutting-edge AI technologies and research projects.',
    designations: [
      'Head of AI Research',
      'Senior Machine Learning Engineer',
      'NLP Specialist',
      'Computer Vision Engineer',
      'AI Research Scientist',
      'Junior Data Scientist',
      'AI Intern',
    ],
  },
  {
    name: 'Software Engineering',
    description: 'Builds and maintains scalable, secure software products.',
    designations: [
      'VP of Engineering',
      'Engineering Manager',
      'Lead Full Stack Developer',
      'Backend Developer (Node.js)',
      'Frontend Developer (React/Vue)',
      'DevOps Engineer',
      'QA Automation Engineer',
      'Software Engineer Intern',
    ],
  },
  {
    name: 'Product & Design',
    description: 'Responsible for user experience and product innovation.',
    designations: [
      'Product Manager',
      'UX/UI Designer',
      'UX Researcher',
      'Visual Designer',
      'Product Analyst',
      'Associate Product Designer',
    ],
  },
  {
    name: 'Marketing & Strategy',
    description: 'Drives growth through creative marketing and strategy.',
    designations: [
      'Head of Marketing',
      'Digital Marketing Manager',
      'Content Strategist',
      'SEO Specialist',
      'Social Media Manager',
      'Marketing Analyst',
    ],
  },
  {
    name: 'Customer Success',
    description: 'Ensures client satisfaction and seamless onboarding.',
    designations: [
      'Head of Customer Experience',
      'Customer Success Manager',
      'Technical Support Engineer',
      'Implementation Specialist',
      'Onboarding Consultant',
    ],
  },
  {
    name: 'Human Resources',
    description: 'Manages people, culture, recruitment, and policies.',
    designations: [
      'HR Head',
      'Talent Acquisition Manager',
      'HR Business Partner',
      'Learning & Development Manager',
      'HR Generalist',
      'People Operations Associate',
    ],
  },
  {
    name: 'IT & Security',
    description: 'Maintains internal systems and protects against cyber threats.',
    designations: [
      'IT Manager',
      'Network & Systems Administrator',
      'Cybersecurity Analyst',
      'Technical Support Specialist',
      'Cloud Infrastructure Engineer',
    ],
  },
];

export default function DepartmentsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Departments</h1>
      <Accordion type="single" collapsible className={styles.accordion}>
        {departments.map((dept, index) => (
          <AccordionItem value={`item-${index}`} key={index} className={styles.item}>
            <AccordionTrigger className={styles.trigger}>{dept.name}</AccordionTrigger>
            <AccordionContent className={styles.content}>
              <p className={styles.description}>{dept.description}</p>
              <ul className={styles.designationList}>
                {dept.designations.map((role, i) => (
                  <li key={i}>{role}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
