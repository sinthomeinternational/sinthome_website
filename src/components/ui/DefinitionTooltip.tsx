import React from 'react';
import Tooltip from './Tooltip';

// Define philosophical and theoretical terms
const definitions: Record<string, { term: string; definition: string; context?: string }> = {
  'praxis': {
    term: 'Praxis',
    definition: 'Practice, especially revolutionary practice as opposed to theory. In Marxist philosophy, praxis refers to the unity of theory and practice in transforming the world.',
    context: 'From Greek πρᾶξις (praxis), meaning "action" or "practice"'
  },
  'aber': {
    term: 'Aber',
    definition: 'German word meaning "but" or "however." Marx\'s pivotal word that introduces the necessity of changing the world rather than just interpreting it.',
    context: 'From Marx\'s 11th Thesis on Feuerbach'
  },
  'arche': {
    term: 'ἀρχή (Arche)',
    definition: 'Greek word meaning "beginning," "origin," or "first principle." In ancient philosophy, the fundamental principle from which all things originate.',
    context: 'From ancient Greek ἀρχή, foundational concept in pre-Socratic philosophy'
  },
  'dann': {
    term: 'Dann',
    definition: 'German word meaning "then" or "afterward." In Marx\'s critique, it represents the temporal sequence that S.R.T.P. seeks to overcome.',
    context: 'German temporal adverb'
  },
  'zu-kunft': {
    term: 'Zu-Kunft',
    definition: 'German compound meaning "coming toward" or "future." Literally "to-coming," emphasizing the active movement toward what is to come.',
    context: 'German: zu (to/toward) + Kunft (coming), from kommen (to come)'
  },
  'a-venir': {
    term: 'À-venir',
    definition: 'French meaning "to come" or "future." In Derridean philosophy, it emphasizes the openness and unpredictability of what is to come.',
    context: 'From French à (to) + venir (to come)'
  },
  'srtp': {
    term: 'S.R.T.P.',
    definition: 'Sinthome Revolutionary Theoretical Practice. A program that formulates guidelines for social praxis through the circulation between theoretical critique and revolutionary practice.',
    context: 'Sinthome organization\'s theoretical framework'
  },
  'dialectical materialism': {
    term: 'Dialectical Materialism',
    definition: 'Marx\'s method of understanding social change through the conflict of opposing forces within material conditions, emphasizing contradiction and development.',
    context: 'Marxist philosophical framework'
  },
  'theoretical critique': {
    term: 'Theoretical Critique',
    definition: 'Critical analysis of theory and concepts that examines their assumptions, limitations, and implications for understanding and changing social reality.',
    context: 'Critical theory methodology'
  },
  'sinthome': {
    term: 'Sinthome',
    definition: 'Lacan\'s concept referring to the singular way each subject manages their fundamental symptom and desire, beyond standard symbolic frameworks.',
    context: 'From Jacques Lacan\'s later seminars, particularly Seminar XXIII'
  },
  'verändern': {
    term: 'Verändern',
    definition: 'German verb meaning "to change" or "to transform." In Marx\'s thesis, it emphasizes the active transformation of the world rather than passive interpretation.',
    context: 'From Marx\'s 11th Thesis on Feuerbach: "es kommt aber darauf an, sie zu verändern"'
  },
  'interpretiert': {
    term: 'Interpretiert',
    definition: 'German past participle meaning "interpreted." Marx critiques philosophers who have only interpreted the world in various ways.',
    context: 'From Marx\'s 11th Thesis on Feuerbach'
  },
  'revolutionary thinking': {
    term: 'Revolutionary Thinking',
    definition: 'A mode of thought that challenges existing structures and imagines radical alternatives, oriented toward fundamental social transformation.',
    context: 'Critical theory and Marxist philosophy'
  }
};

interface DefinitionTooltipProps {
  term: keyof typeof definitions;
  children?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function DefinitionTooltip({
  term,
  children,
  className = '',
  position = 'top'
}: DefinitionTooltipProps) {
  const definition = definitions[term];

  if (!definition) {
    console.warn(`Definition not found for term: ${term}`);
    return <>{children || term}</>;
  }

  const tooltipContent = (
    <div className="space-y-2">
      <div className="font-semibold text-red-300 text-sm">{definition.term}</div>
      <div className="text-zinc-200 text-sm leading-relaxed">{definition.definition}</div>
      {definition.context && (
        <div className="text-zinc-400 text-xs italic border-t border-zinc-700 pt-2 mt-2">
          {definition.context}
        </div>
      )}
    </div>
  );

  return (
    <Tooltip
      content={tooltipContent}
      className={className}
      position={position}
      delay={300}
    >
      {children || (
        <span className="text-red-300 font-medium">
          {term === 'arche' ? 'ἀρχή' :
           term === 'zu-kunft' ? 'zu-Kunft' :
           term === 'a-venir' ? 'a-venir' :
           term === 'srtp' ? 'S.R.T.P.' :
           term === 'verändern' ? 'verändern' :
           term === 'interpretiert' ? 'interpretiert' :
           definition.term}
        </span>
      )}
    </Tooltip>
  );
}

// Export the definitions for external use if needed
export { definitions };