export default function ButtonActions({ id }) {
  const handleClick = () => {
    console.log(id);
  };

  return <button onClick={handleClick}>Action</button>;
}
