import { Column, Icon, Row, Text } from 'components';

export type ListItemProps = {
  index: number;
  id: number;
  title: string;
  completed: boolean;
  isActive: boolean;
  onClick: (index: number) => void;
};

export const ListItem: React.FC<ListItemProps> = ({ index, id, title, completed, isActive, onClick }) => {
  return (
    <Column
      width="100%"
      bg="rgba(0,0,0,0.2)"
      mb="10px"
      p="20px"
      cursor="pointer"
      borderRadius="4px"
      borderLeftWidth="5px"
      borderLeftStyle="solid"
      borderLeftColor={isActive ? '#fff' : 'transparent'}
      onClick={() => onClick(index)}
    >
      <Row>
        <Text flex={1}>{title}</Text>
        {completed && <Icon variant="done-white" />}
      </Row>
    </Column>
  );
};
