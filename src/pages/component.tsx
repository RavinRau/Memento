import { Button } from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown/Dropdown";
import { DropdownItemProps } from "@/components/Dropdown/DropdownTypes";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { CreditCard, Keyboard, Mail, MessageSquare, MoreHorizontalIcon, Settings, User, UserPlus } from "lucide-react";
import { toast } from "sonner";
import CardWithDropdown from '@/components/Card/CardWithDropdown';

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
          contentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
        {
          title: "Features Overview",
          contentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
        {
          title: "Best Practices",
          contentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis "
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

    const cardDropdownItems: DropdownItemProps[] = [
        { type: 'item', text: 'Edit', onClick: () => console.log('Edit clicked') },
        { type: 'item', text: 'Delete', onClick: () => console.log('Delete clicked') },
        { type: 'item', text: 'Share', onClick: () => console.log('Share clicked') },
    ];

    return (
        <div className="p-8 space-y-12">
            {/* Typography Section */}
            <section className="space-y-2">
                <h1 className="text-h2">Typography</h1>
                <div className="space-y-4">
                    <h1 className="text-h1">Heading 1</h1>
                    <h2 className="text-h2">Heading 2</h2>
                    <h3 className="text-h3">Heading 3</h3>
                    <p className="text-body">Regular body text</p>
                    <p className="text-small">Small text</p>
                </div>
            </section>

            {/* <HoverBorderGradient
            containerClassName="w-full"
            ><
                div className='w-[350px] h-[350px]'/>
                </HoverBorderGradient> */}

            {/* Button Section */}
            <section className="space-y-2">
                <h2 className="text-h2">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    {buttonContent.map((button, index) => (
                        <Button 
                            key={`button-${index}`}
                            variant={button.variant}
                            onClick={button.onClick}
                        >
                            {button.title}
                        </Button>
                    ))}
                </div>
            </section>

            {/* Card Section */}
            <section className="space-y-2">
                <h2 className="text-h2">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardContent.map((card, index) => (
                        <Card 
                            key={`card-${index}`}
                            title={card.title}
                        >
                            {card.contentText}
                        </Card>
                    ))}
                </div>
            </section>

            {/* Card With Dropdown Section */}
            <section className="space-y-2">
                <h2 className="text-h2">Cards with Dropdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardContent.map((card, index) => (
                        <CardWithDropdown 
                            key={`card-dropdown-${index}`}
                            title={card.title}
                            dropdownItems={cardDropdownItems}
                        >
                            {card.contentText}
                        </CardWithDropdown>
                    ))}
                </div>
            </section>

            {/* Dropdown Section */}
            <section className="space-y-2">
                <h2 className="text-h2">Dropdown</h2>
                <div>
                    <Dropdown label={<MoreHorizontalIcon />} data={dropdownContent} />
                </div>
            </section>
        </div>
    );
};

export default ComponentDisplay;