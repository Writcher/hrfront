import { useForm } from "react-hook-form";

type placeholder = {
    filterAnchor: any
    activeFilters: { [key: string]: any }
}

export default function ReportTable() {
    const { watch, setValue, getValues, control } = useForm<placeholder>({
        defaultValues: {
            //filters
            filterAnchor: null,
            activeFilters: {},
        }
    });

    //filters
    const filterAnchor = watch("filterAnchor") as any;
    const filterMenuOpen = Boolean(filterAnchor);
    const activeFilters = watch("activeFilters") as { [key: string]: any };
    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setValue("filterAnchor", event.currentTarget);
    };
    const handleFilterClose = () => {
        setValue("filterAnchor", null);
    };
    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full bg-red-100">
            <div className="flex flex-col items-center justify-between w-[90%] h-[75%] bg-green-100">

            </div>
        </div>
    );
};