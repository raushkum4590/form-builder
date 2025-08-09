// OpenRouter AI Integration for Form Builder
export interface OpenRouterConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

export interface AIFormSuggestion {
  fields: Array<{
    type: string;
    label: string;
    required: boolean;
    validation?: Record<string, any>;
    options?: string[];
  }>;
  formName: string;
  description: string;
}

export class OpenRouterAI {
  private config: OpenRouterConfig;

  constructor(config: OpenRouterConfig) {
    this.config = config;
  }

  async generateFormFromPrompt(prompt: string): Promise<AIFormSuggestion> {
    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Form Builder Pro'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: `You are an expert form designer. Create a JSON form configuration based on user requirements. 
              Return only valid JSON in this exact format:
              {
                "formName": "Form Name",
                "description": "Brief description",
                "fields": [
                  {
                    "type": "text|number|textarea|select|radio|checkbox|date",
                    "label": "Field Label",
                    "required": true/false,
                    "validation": {"minLength": 3, "email": true, "pattern": "regex"},
                    "options": ["Option 1", "Option 2"] // only for select/radio
                  }
                ]
              }`
            },
            {
              role: 'user',
              content: `Create a form for: ${prompt}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;
      
      if (!aiResponse) {
        throw new Error('No response from AI model');
      }

      // Parse the JSON response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON format in AI response');
      }

      const formSuggestion = JSON.parse(jsonMatch[0]);
      return formSuggestion;

    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`AI form generation failed: ${errorMessage}`);
    }
  }

  async suggestFieldImprovements(fieldConfig: any): Promise<string[]> {
    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Form Builder Pro'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: 'You are a UX expert. Suggest improvements for form fields. Return suggestions as a JSON array of strings.'
            },
            {
              role: 'user',
              content: `Suggest improvements for this field: ${JSON.stringify(fieldConfig)}`
            }
          ],
          temperature: 0.5,
          max_tokens: 500
        })
      });

      const data = await response.json();
      const suggestions = JSON.parse(data.choices[0]?.message?.content || '[]');
      return suggestions;

    } catch (error) {
      console.error('AI Suggestions Error:', error);
      return ['Consider adding validation rules', 'Review field label clarity'];
    }
  }

  async generateDerivedFormula(parentFields: string[], description: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Form Builder Pro'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: 'You are a JavaScript expert. Generate a formula for derived fields using the provided parent field names. Return only the JavaScript expression.'
            },
            {
              role: 'user',
              content: `Create a formula using these fields: ${parentFields.join(', ')}. Description: ${description}`
            }
          ],
          temperature: 0.3,
          max_tokens: 300
        })
      });

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';

    } catch (error) {
      console.error('AI Formula Generation Error:', error);
      return `{${parentFields[0]}} + {${parentFields[1] || parentFields[0]}}`;
    }
  }
}

// Default configuration for OpenRouter
export const createOpenRouterAI = (apiKey?: string) => {
  const envApiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  const finalApiKey = apiKey || envApiKey;
  
  if (!finalApiKey || finalApiKey === 'your-api-key-here') {
    throw new Error('OpenRouter API key is required. Please set NEXT_PUBLIC_OPENROUTER_API_KEY in your .env.local file or provide it directly.');
  }

  return new OpenRouterAI({
    apiKey: finalApiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    model: 'qwen/qwen-2.5-72b-instruct'
  });
};
