import CodeCard from "./code-card";

const HighlightedCodeList = ({ response }: any) => {
  return (
    <div className="w-full max-w-3xl">
      {response.data.map((clip: any) => (
        <CodeCard key={clip.id} clip={clip} isEditEnabled={false} />
      ))}
    </div>
  );
};

export default HighlightedCodeList;
