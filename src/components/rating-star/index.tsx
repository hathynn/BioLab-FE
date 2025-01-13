const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927a1 1 0 011.902 0l1.518 4.668h4.908a1 1 0 01.592 1.81l-3.978 2.892 1.518 4.668a1 1 0 01-1.54 1.127L10 14.812l-3.978 2.892a1 1 0 01-1.54-1.127l1.518-4.668-3.978-2.892a1 1 0 01.592-1.81h4.908L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

export default RatingStars;
