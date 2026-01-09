import { memo } from "react";
import PageHeader from "../../../../shared/components/pageHeader";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../service/useService";

const CategoryDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { getByIdService } = useService();
  const data = getByIdService(id);
  console.log(data  );

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-6"
      >
        <ChevronLeft size={30} color="gray"/>
        <PageHeader title="CategoryDetail" />
      </div>
    </div>
  );
};

export default memo(CategoryDetail);
