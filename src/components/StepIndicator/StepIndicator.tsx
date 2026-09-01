import { Check } from 'lucide-react';
import styles from './StepIndicator.module.css';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className={styles.wrapper}>
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={step} className={styles.stepGroup}>
            <div className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}>
              <div className={styles.circle}>
                {isCompleted ? <Check size={16} /> : stepNum}
              </div>
              <span className={styles.label}>{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`${styles.connector} ${isCompleted ? styles.connectorDone : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
