import { useIntl } from "react-intl";
import Button from "../Button/Button";
import { FC } from "react";
import { CirclePlus } from "lucide-react";

interface AddButtonProps {
  textId: string;
  onClick: () => void;
}

const AddButton: FC<AddButtonProps> = ({ textId, onClick }) => {
  const intl = useIntl()

  return (
    <Button onClick={onClick}>
      <CirclePlus size={16} />
      {intl.formatMessage({ id: 'add' })}
      {' '}
      {intl.formatMessage({ id: textId })}
    </Button>
  );
}

export default AddButton;