import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";

interface OTPVerificationProps {
    phone: string;
    onVerified: (idToken: string) => void;
    onBack: () => void;
    isLoading?: boolean;
}

const OTPVerification = ({ phone, onVerified, onBack, isLoading = false }: OTPVerificationProps) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();

        // Resend timer
        const timer = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only last digit
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Clear error when user types
        if (error) setError("");
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setError("Please enter complete OTP");
            return;
        }

        try {
            // Pass the OTP code directly for verification
            onVerified(otpCode);
        } catch (err) {
            console.error("OTP verification error:", err);
            setError("Invalid OTP. Please try again.");
        }
    };

    const handleResend = () => {
        setResendTimer(30);
        setOtp(["", "", "", "", "", ""]);
        setError("");
        inputRefs.current[0]?.focus();
        // TODO: Implement resend OTP logic
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="p-2"
                    disabled={isLoading}
                >
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h3 className="text-xl font-semibold">Verify OTP</h3>
                    <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code sent to {phone}
                    </p>
                </div>
            </div>

            <div>
                <Label className="text-base">Enter OTP</Label>
                <div className="flex gap-2 mt-2">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg font-semibold"
                            disabled={isLoading}
                        />
                    ))}
                </div>
                {error && (
                    <p className="text-destructive text-sm mt-2">{error}</p>
                )}
            </div>

            <div className="space-y-3">
                <Button
                    onClick={handleVerify}
                    disabled={isLoading || otp.join("").length !== 6}
                    className="w-full"
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </Button>

                <div className="text-center">
                    {resendTimer > 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Resend OTP in {resendTimer}s
                        </p>
                    ) : (
                        <Button
                            variant="link"
                            onClick={handleResend}
                            className="text-sm"
                            disabled={isLoading}
                        >
                            Resend OTP
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;