import { Message } from "../messages/messages";

export async function getChatResponse(messages: Message[], apiKey: string|undefined, endPoint:string|undefined){
    if (!apiKey || !endPoint) {
        throw new Error("Invalid API Key");
      }
    
    const res_body = {
        "messages": [
          {
            "role": "system",
            "content": ""
          },
          {
            "role": "user",
            "content": messages
          },
          {
            "role": "assistant",
            "content": ""
          }
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "max_tokens": 800,
        "stop": null
      }
      //endpointを指定してfetch
        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(res_body)
        });

        //jsonを取得
        const json = await res.json();
        //jsonの中のchoicesの中のmessageの中のcontentを取得
        try{
            const message = json.choices[0].message.content;
            console.log(message);
            return { message: message };
        }catch(error:any){
            console.error('Error:', error)
        }
}


export async function getChatResponseStream(messages: Message[], apiKey: string|undefined, endPoint:string|undefined){
    if (!apiKey || !endPoint) {
        throw new Error("Invalid API Key");
      }
    
    const res_body = {
        "messages": messages,
        "temperature": 0.7,
        "top_p": 0.95,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "max_tokens": 800,
        "stop": null,
        "stream": true
      }
      //endpointを指定してfetch
        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(res_body)
        });

        const reader = res.body?.getReader();
        if (res.status !== 200 || !reader) {
          throw new Error("Something went wrong");
        }
      
        const stream = new ReadableStream({
          async start(controller: ReadableStreamDefaultController) {
            const decoder = new TextDecoder("utf-8");
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const data = decoder.decode(value);
                const chunks = data
                  .split("data:")
                  .filter((val) => !!val && val.trim() !== "[DONE]");
                for (const chunk of chunks) {
                  const json = JSON.parse(chunk);
                  const messagePiece = json.choices[0].delta.content;
                  if (!!messagePiece) {
                    controller.enqueue(messagePiece);
                  }
                }
              }
            } catch (error) {
              controller.error(error);
            } finally {
              reader.releaseLock();
              controller.close();
            }
          },
        });
      
        return stream;
}