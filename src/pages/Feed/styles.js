import styled from 'styled-components/native';

export const Post = styled.View``;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  color: #333;
  font-weight: bold;
`;

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;

export const Stories = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

export const AvatarStory = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 28px;
  border-width: 1px;
`;

export const AvatarBlock = styled.View`
  margin-right: 20px;
  display: flex;
  align-items: ${(props) => (props.nameLength > 10 ? 'flex-start' : 'center')};
`;

export const StoryName = styled.Text`
  font-size: 10px;
`;
