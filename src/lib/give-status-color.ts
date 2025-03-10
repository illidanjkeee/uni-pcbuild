export default function giveStatusColor(status: string) {
  switch (status) {
    case "checkout":
      return "text-blue-500";
    case "rejected":
      return "text-red-500";
    case "shipped":
      return "text-yellow-500";
    case "approved":
      return "text-lime-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
