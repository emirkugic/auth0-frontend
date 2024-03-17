import { useQuery } from "react-query";

import { ServicesService } from "../services";

const useService = (teamName: string) => {
    return useQuery(
        ['services'],
        () => ServicesService.fetchServicesByTeam(teamName)
    )
}

export default useService;