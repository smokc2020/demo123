{
  "name": "Research Automation - Content Social Creation",
  "nodes": [
    {
      "parameters": {
        "toolDescription": "Use this tool to search the internet",
        "method": "POST",
        "url": "https://api.tavily.com/search",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\n    \"api_key\": \"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\",\n    \"query\": \"{searchTerm}\",\n    \"search_depth\": \"basic\",\n    \"include_answer\": true,\n    \"topic\": \"news\",\n    \"include_raw_content\": true,\n    \"max_results\": 3\n} ",
        "placeholderDefinitions": {
          "values": [
            {
              "name": "searchTerm",
              "description": "What the user has requested to write a blog about",
              "type": "string"
            }
          ]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
      "typeVersion": 1.1,
      "position": [
        -460,
        440
      ],
      "id": "0bc6e017-fb60-40f0-8253-f27a03ba0911",
      "name": "Tavily"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
      "typeVersion": 1.2,
      "position": [
        -660,
        340
      ],
      "id": "52ea4cf4-edf1-4dde-9406-96f12f63367a",
      "name": "Anthropic Chat Model",
      "credentials": {
        "anthropicApi": {
          "id": "Paj2wKS1JlwKqXSt",
          "name": "Anthropic account"
        }
      }
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "14d9076e-27ea-4846-8b44-f83cf4022b9e",
              "name": "response",
              "value": "={{ $json.output }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        0,
        -20
      ],
      "id": "a161dab7-12e9-4586-9e28-14139eced19e",
      "name": "Response"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "f2a8ff2d-6b59-4ad6-a2e7-8705354f4105",
              "name": "response",
              "value": "Error occurred. Please try again.",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        0,
        180
      ],
      "id": "ee8cca09-7000-4898-ac1a-5e202616db44",
      "name": "Try Again"
    },
    {
      "parameters": {
        "inputSource": "passthrough"
      },
      "type": "n8n-nodes-base.executeWorkflowTrigger",
      "typeVersion": 1.1,
      "position": [
        -700,
        80
      ],
      "id": "85ac6b9d-38c2-4dee-a5b8-298d129c063e",
      "name": "When Executed by Another Workflow"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.query}}",
        "options": {
          "systemMessage": "=# Overview\nYou are a professional social media content creator and researcher specializing in crafting engaging, well-structured, and AI-enhanced content for Facebook profile posts. Your expertise lies in producing compelling content that resonates with Vietnamese-speaking professionals, including CEOs, SMEs, marketers, content marketers, and SEO specialists aged 20-35.\n\n## Content Style and Tone\nAnalyze the provided Google Docs file containing examples of previous Facebook posts to understand the unique writing style, tone, and content preferences. Emulate this style in all generated content to maintain consistency and authenticity. Key characteristics to incorporate:\n- **Professional & expert-driven**: Showcase deep industry knowledge with well-researched insights.\n- **Authoritative & thought-provoking**: Offer valuable perspectives, establish credibility, and position the writer as a leader in the field.\n-  **Friendly & conversational**: Write in a way that feels natural, like a knowledgeable mentor sharing insights with peers.\n- **Humorous & engaging**: Where appropriate, use light humor, relatable analogies, and witty remarks to keep the content enjoyable and memorable.\n\n## Main Tasks\n1. **Content Creation**: Develop concise, compelling, and engaging Facebook posts that align with the analyzed style and resonate with the target audience. Ensure content is optimized for readability and emotional impact, maintaining originality and relevance.\n2. **Trend Research and Summarization**: Utilize the Tavily tool to research current trends, viral content, and industry updates. Summarize findings and craft posts under 250 words that capture attention and stimulate discussion.\n\n## Tools\n- **Tavily**: Employ this tool to search the web for up-to-date, relevant information to inform and enhance your content creation.\n- **Google Docs  - Learn about Vincent Do Writing stlye**: Use this to learn and see examples of content facebook post that I have written.\n\n## Social Content Requirements\n- **Language**: All content must be written in Vietnamese.\n- **Formatting**:\n  - Use short, impactful sentences with appropriate line breaks for readability.\n  - Incorporate emojis and hashtags where suitable to enhance engagement and visibility.\n  - Include clear calls-to-action to prompt audience interaction.\n- **Structure**: Apply storytelling techniques, emotional triggers, or provocative questions to foster engagement.\n- **Brand Alignment**: Ensure the tone and style align with the intended brand or personal branding, reflecting the preferences identified in the analyzed Google Docs examples.\n - **Engagement Focus**: Each post should end with a thought-provoking **question** to drive engagement.\n- **Readability**: Content must be structured into short paragraphs for optimal mobile experience.\n- **Hashtags**: Include **3 relevant hashtags** at the end of each post.\n- [add power words for the content]\n\n## Output Requirements\n- **Language**: Vietnamese\n- **Length**: Each post should be less than 250 words.\n- **Style Consistency**: Adhere to the writing style and tone derived from the provided Google Docs examples to ensure consistency with previous content.\n"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.7,
      "position": [
        -440,
        80
      ],
      "id": "fe9821ba-a386-485c-9ad1-bec1ce186512",
      "name": "Content Creator & Research Agent",
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "operation": "get",
        "documentURL": "1rxpfzMiUcol0wdyBJYo7t4rpTwjBwLx1A8LC0Wp19II"
      },
      "type": "n8n-nodes-base.googleDocsTool",
      "typeVersion": 2,
      "position": [
        -160,
        420
      ],
      "id": "6b38620c-f5ff-4b32-ac06-253bf4d0f504",
      "name": "Google Docs  - Learn about Vincent Do Writing stlye",
      "credentials": {
        "googleDocsOAuth2Api": {
          "id": "CXyAe3TMGXwTSkPC",
          "name": "Google Docs account"
        }
      }
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "1IfR2tuEdstJ7k1FH8XTNqTrfbS-DXzIgojeFoSjzMwM",
          "mode": "id"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1IfR2tuEdstJ7k1FH8XTNqTrfbS-DXzIgojeFoSjzMwM/edit#gid=0"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Yêu cầu": "={{ $('When Executed by Another Workflow').item.json.query }}",
            "Content": "={{ $('Content Creator & Research Agent').item.json.output }}"
          },
          "matchingColumns": [
            "ổn chứ?"
          ],
          "schema": [
            {
              "id": "Yêu cầu",
              "displayName": "Yêu cầu",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Content",
              "displayName": "Content",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Link post",
              "displayName": "Link post",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Others Link / Information",
              "displayName": "Others Link / Information",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        220,
        -20
      ],
      "id": "f67f9966-a666-4d79-b0f7-bdfe383e7ad5",
      "name": "Update lên Google sheet",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "ihRWQkgtRjoeiluj",
          "name": "Google Sheets account"
        }
      }
    }
  ],
  "pinData": {
    "When Executed by Another Workflow": [
      {
        "json": {
          "query": "Create a Facebook post introducing n8n and its power. The post should be in Vietnamese and include:\n- Professional but friendly tone\n- Explanation of what n8n is\n- Main benefits and use cases\n- Appropriate emojis\n- Easy to understand language\n- Relevant hashtags\n- Clear call-to-action\nWrite as an automation and AI expert."
        }
      }
    ]
  },
  "connections": {
    "Tavily": {
      "ai_tool": [
        [
          {
            "node": "Content Creator & Research Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Anthropic Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Content Creator & Research Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "When Executed by Another Workflow": {
      "main": [
        [
          {
            "node": "Content Creator & Research Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Content Creator & Research Agent": {
      "main": [
        [
          {
            "node": "Response",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Try Again",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Docs  - Learn about Vincent Do Writing stlye": {
      "ai_tool": [
        [
          {
            "node": "Content Creator & Research Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Response": {
      "main": [
        [
          {
            "node": "Update lên Google sheet",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Update lên Google sheet": {
      "main": [
        []
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "67b323e8-b68e-4849-979f-b56165b28189",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "c6957cc8da1f18458e581bcb559195e32f29552d5fe4402753e1b7a753c4a4c6"
  },
  "id": "ydCpDamqRmLhnSyx",
  "tags": []
}
