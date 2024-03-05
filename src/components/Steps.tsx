import React from "react";

interface StepsProps {
    stepNames: string[];
    stepsContent: React.ReactNode[];
    activeStep: number;
}

function Steps({ stepNames, stepsContent, activeStep }: StepsProps) {
    return (
        <div>
            <div className="flex justify-between">
                {stepNames.map((stepName, index) => {
                    return (
                        <div key={index}
                            className={`flex flex-col gap-2 ${index !== stepNames.length - 1 && "w-full"}`}>
                            <div className="flex items-center">
                                <div // 数字の表示部分
                                    className={`h-8 w-8 rounded-full  flex justify-center items-center
                                    ${activeStep >= index // 最初はどちらも0
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-500 text-gray-200"
                                        }`}>
                                    {index + 1}
                                </div>
                                {/* ゲージバー表示部分: Steps.tsx, General.tsx, event-form/index.tsxを確認 */}
                                {activeStep > index && index !== stepNames.length - 1 && ( // setActive()によりactiveStepが更新された時
                                    <div className="h-1 w-full bg-blue-600"></div>
                                )}
                                {activeStep <= index && index !== stepNames.length - 1 && (// 次へを押さないとactiveStepは増えていかないから、現在のページにいる段階では以降のページはゲージが白くなるように設定
                                    <div className="h-1 w-full bg-gray-200"></div>
                                )}
                            </div>
                            <h1 className="text-sm">{stepName}</h1>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5">
                {stepsContent[activeStep]}
            </div>
        </div>
    );
}

export default Steps;