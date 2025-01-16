import { Card } from "antd";
import { FC } from "react";

interface CustomizedCardProps {
  /** What tailwind class want to use for customizing card? */
  styleClass?: string;
  /** Card's customized background */
  background?: string;
  /** Rendering  */
  loading?: boolean;
  /** Card contents */
  children?: React.ReactNode;
}

const CustomizedCard: FC<CustomizedCardProps> = ({
  styleClass,
  background,
  loading,
  children,
  ...props
}) => {
  return (
    <Card
      className={[`w-full h-full bg-cover`, styleClass].join(" ")}
      style={{ backgroundImage: background }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomizedCard;
