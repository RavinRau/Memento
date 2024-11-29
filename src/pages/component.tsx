import { Button } from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown/Dropdown";
import { DropdownItemProps } from "@/components/Dropdown/DropdownTypes";
import { CreditCard, Keyboard, Mail, MessageSquare, MoreHorizontalIcon, Settings, User, UserPlus } from "lucide-react";
import { toast } from "sonner";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "link" | "ghost";

type ButtonContent = {
  variant: ButtonVariant;
  title: string;
  onClick: () => void;
}

type CardContent = {
  title: string;
  contentText: string;
}

const ComponentDisplay = () => {
    const buttonContent: ButtonContent[] = [
        {
          variant: 'default',
          title: 'Default Button',
          onClick: () => toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        },
        {
          variant: 'destructive',
          title: 'Destructive Button',
          onClick: () => toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        },
        {
          variant: 'outline',
          title: 'Outline Button',
          onClick: () => toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        },
        {
          variant: 'secondary',
          title: 'Secondary Button',
          onClick: () => toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        }
    ];

    const cardContent: CardContent[] = [
        {
          title: "Getting Started",
          contentText: "Learn how to integrate our solution into your application."
        },
        {
          title: "Features Overview",
          contentText: "Explore the key features and capabilities of our platform."
        },
        {
          title: "Best Practices",
          contentText: "Discover the recommended practices for optimal performance."
        }
    ];

    const dropdownContent: DropdownItemProps[] = [
        { type: 'label', text: 'My Account' },
        {
          type: 'group',
          items: [
            { type: 'item', icon: <User />, text: 'Profile', onClick: () => {console.log('Do something!')} },
            { type: 'item', icon: <CreditCard />, text: 'Billing', description: 'Manage your billing information' },
            { type: 'item', icon: <Settings />, text: 'Settings', description: 'Adjust your account settings' },
            { type: 'item', icon: <Keyboard />, text: 'Keyboard', description: 'Customize keyboard shortcuts' },
            {
              type: 'submenu',
              icon: <UserPlus />,
              text: 'Invite Users',
              items: [
                { type: 'item', icon: <Mail />, text: 'Email', description: 'Send invitation via email' },
                {
                  type: 'submenu',
                  icon: <MessageSquare />,
                  text: 'Message',
                  items: [{ type: 'item', icon: <Mail />, text: 'Email', description: 'Send invitation via message' }],
                },
              ],
            },
          ],
        },
    ];

    return (
        <div className="p-4">
          <div className="flex w-96">
            {buttonContent.map((button, index) => (
              <Button 
                key={`button-${index}`}
                variant={button.variant}
                onClick={button.onClick}
                className="mx-2"
              >
                {button.title}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {cardContent.map((card, index) => (
              <Card 
                key={`card-${index}`}
                title={card.title}
              >
                {card.contentText}
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Dropdown label={<MoreHorizontalIcon />} data={dropdownContent} />
          </div>
        </div>
    );
};

export default ComponentDisplay;