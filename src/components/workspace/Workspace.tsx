import { useState, useEffect } from "react";
import Preview from "@/components/Preview.tsx";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
    Check,
    Bot,
    TriangleAlert,
    X,
    Loader2,
} from "lucide-react";
import CopyButton from "@/components/buttons/CopyButton";
import DownloadButton from "@/components/buttons/DownloadButton";
import { Separator } from "../ui/separator";

type Props = {
    site: string;
};

type TApiResponse = {
    found: boolean;
    bot?: boolean;
    error: boolean;
};

type TValidationStatus = "idle" | "loading" | "success" | "error";

const StatusIcon = ({ status, response }: { status: TValidationStatus, response: TApiResponse | null }) => {
    switch (status) {
        case "loading":
            return <Loader2 size={20} className="animate-spin" />;
        case "error":
            return <TriangleAlert size={20} />;
        case "success":
            if (response?.error) {
                return <TriangleAlert size={20} />;
            }
            if (response?.bot) {
                return <Bot size={20} />;
            }
            if (response?.found) {
                return <Check size={20} />;
            }
            return <X size={20} />;
        case "idle":
        default:
            return null;
    }
};

export default function Workspace({ site }: Props) {
    const [userId, setUserId] = useState("");
    const [sliderValue, setSliderValue] = useState(3);
    const [status, setStatus] = useState<TValidationStatus>("idle");
    const [response, setResponse] = useState<TApiResponse | null>(null);
    const [debouncedUserId, setDebouncedUserId] = useState(userId);
    const [debouncedSliderValue, setDebouncedSliderValue] = useState(sliderValue);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedUserId(userId); }, 500);
        return () => { clearTimeout(handler); };
    }, [userId]);

    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedSliderValue(sliderValue); }, 500);
        return () => { clearTimeout(handler); };
    }, [sliderValue]);

    useEffect(() => {
        if (!debouncedUserId) {
            setStatus("idle");
            setResponse(null);
            return;
        }

        const fetchUserStatus = async () => {
            setStatus("loading");
            setResponse(null);
            try {
                const res = await fetch(`/exists/${debouncedUserId}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: TApiResponse = await res.json();
                setResponse(data);
                setStatus("success");
            } catch (error) {
                console.error("Failed to fetch user status:", error);
                setStatus("error");
                setResponse(null);
            }
        };

        fetchUserStatus();
    }, [debouncedUserId]);

    useEffect(() => {
        if (status === 'success' && response?.found && debouncedUserId) {
            const url = `/ds/${debouncedUserId}.gif?delay=${debouncedSliderValue}`;
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    }, [status, response, debouncedUserId, debouncedSliderValue]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, "");
        setUserId(value);
    };

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between border shadow-lg rounded-lg">
            <div className="flex-col p-3">
                <div className="gap-4 grid">
                    <div className="gap-2 grid">
                        <label htmlFor="userId" className="text-sm leading-none font-semibold">Discord user ID *</label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="userId"
                                placeholder="Paste the user ID"
                                value={userId}
                                onChange={handleInputChange}
                                pattern="\d*"
                                maxLength={40}
                                aria-label="Paste the user ID"
                                className="flex-grow"
                            />
                            <div className="size-8 aspect-square flex items-center justify-center">
                                <StatusIcon status={status} response={response} />
                            </div>
                        </div>
                    </div>
                    <div className="gap-2 grid">
                        <p className="text-sm leading-none font-semibold">
                            Speed (smaller is faster)
                        </p>
                        <Slider
                            defaultValue={[sliderValue]}
                            onValueChange={handleSliderChange}
                            min={2}
                            max={10}
                            step={1}
                        />
                    </div>
                    <div className="flex gap-2">
                        <CopyButton url={site + previewUrl} />
                        <DownloadButton url={previewUrl} />
                    </div>
                </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="flex items-center justify-center p-4 w-full md:w-[200px]">
                <Preview src={previewUrl} disabledText="Paste user ID to see preview" />
            </div>
        </div>
    );
}
