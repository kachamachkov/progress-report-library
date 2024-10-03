import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '15px auto',
};

export default function Spinner({ loading }) {
  return (
    <ClipLoader
      color='rgb(92, 229, 0)'
      loading={loading}
      cssOverride={override}
      size={75}
    />
  );
}
