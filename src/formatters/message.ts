import { JSONSchema } from "@atlassianintegrations/polaris-forge-object-resolver";

export interface ChannelFormatterParams {
  url: string;
  name: string;
  num_members: number;
  purpose: {
    value: string;
  };
  topic: {
    value: string;
  };
}

export const formatSlackMessage = function formatSlackMessage({
  message,
  channel,
  user,
  url,
}: {
  message: any;
  channel: any;
  user: any;
  url: string;
}): JSONSchema.Data {
  return {
    type: "messages",
    group: {
      name: "Slack Message",
      id: "message",
    },
    context: {
      icon: "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png",
      url,
      title: `Message in #${channel.name}`,
    },
    content: [
      {
        type: "messagesItem",
        sender: {
          name: user.real_name,
        },
        message: message.text,
        time: Number(message.ts.split(".")[0] + "000"),
      },
    ],
    properties: message.reactions
      ? message.reactions.reduce((result: JSONSchema.Properties, item: any) => {
          result[item.name] = {
            name: `:${item.name}:`,
            value: item.count || 0,
          };
          return result;
        }, {})
      : {},
  };
};
