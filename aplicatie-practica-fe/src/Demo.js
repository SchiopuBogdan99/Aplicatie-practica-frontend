import useAxiosPrivate from "./hooks/useAxiosPrivate";
export default function Demo() {
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.get("/api/v1/demo");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={handleSubmit}>Press me</button>
    </div>
  );
}
