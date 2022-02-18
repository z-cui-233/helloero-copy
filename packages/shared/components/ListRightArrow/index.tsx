import styled from 'styled-components';
import IconArrow from '../../assets/icon/arrow_right.svg';

const ListRightArrow = () => (
  <div>
    <Arrow />
  </div>
);

const Arrow = styled(IconArrow)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  width: 0.7rem;
  height: 0.7rem;
  margin: auto 0;
`;

export default ListRightArrow;
