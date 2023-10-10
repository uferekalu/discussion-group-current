import { Tooltip } from "@material-tailwind/react";

interface ITooltipButtonProps {
  content: string;
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}

const TooltipButton: React.FC<ITooltipButtonProps> = ({
  content,
  children,
}) => {
  return (
    <>
    <div className="mb-3 flex gap-3">
      <Tooltip content={content} placement="top">
        {children}
      </Tooltip>
    </div>
    </>
  );
};

export default TooltipButton
