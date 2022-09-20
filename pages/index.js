import { useState } from "react";
import Head from "next/head";

const randomize = () => Math.floor(Math.random() * 90 + 10);

const Step1 = ({ handleNextStep }) => {
  const icons = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "A" },
    { id: 6, name: "B" },
    { id: 7, name: "C" },
    { id: 8, name: "D" },
    { id: 9, name: "D" },
  ];
  return (
    <>
      <Head>
        <title>Step 1</title>
      </Head>

      <div className="grid grid-cols-3 gap-8">
        {icons.map((icon) => (
          <div
            onClick={() => handleNextStep({ iconName: icon.name }, 2)}
            key={icon.id}
            className="bg-blue-400 w-24 h-24 flex justify-center items-center mx-auto rounded-full hover:cursor-pointer hover:bg-blue-500"
          >
            <p className="text-white text-">{icon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const Step2 = ({ data, handleNextStep }) => {
  const [images, setImages] = useState([
    { id: 1, content: `${data.iconName} ${randomize()}` },
    { id: 2, content: `${data.iconName} ${randomize()}` },
    { id: 3, content: `${data.iconName} ${randomize()}` },
    { id: 4, content: `${data.iconName} ${randomize()}` },
  ]);

  const generate = () => {
    setImages([
      { id: 1, content: `${data.iconName} ${randomize()}` },
      { id: 2, content: `${data.iconName} ${randomize()}` },
      { id: 3, content: `${data.iconName} ${randomize()}` },
      { id: 4, content: `${data.iconName} ${randomize()}` },
    ]);
  };

  return (
    <>
      <Head>
        <title>Step 2</title>
      </Head>

      <div className="grid grid-cols-2 gap-8">
        {images.map((image) => (
          <div
            onClick={() => handleNextStep({ imgContent: image.content }, 3)}
            key={image.id}
            className="bg-blue-400 w-full h-48 flex justify-center items-center mx-auto rounded-lg hover:cursor-pointer hover:bg-blue-500"
          >
            <p className="text-white text-">{image.content}</p>
          </div>
        ))}
      </div>

      <div className="text-center my-8">
        <button
          onClick={generate}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3"
        >
          Regenerate
        </button>
      </div>
    </>
  );
};

const Step3 = ({ data }) => {
  return (
    <>
      <Head>
        <title>Step 3</title>
      </Head>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-blue-400 w-full h-48 flex justify-center items-center mx-auto rounded-lg hover:cursor-pointer hover:bg-blue-500">
          <p className="text-white text-">{data.imgContent}</p>
        </div>
      </div>
    </>
  );
};

const steps = [
  { id: 1, component: Step1, title: "Step 1" },
  { id: 2, component: Step2, title: "Step 2" },
  { id: 3, component: Step3, title: "Step 3" },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const handleSelectStep = (value, nextStep) => {
    setData({ ...data, ...value });
    setStep(nextStep);
  };

  return (
    <div className="bg-gray-200 w-full">
      <div className="bg-white w-[480px] min-h-screen mx-auto">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="bg-blue-400 w-8 h-8 flex justify-center items-center rounded-full">
              <p className="text-white text-sm">{step}</p>
            </div>
            <p className="text-gray-500 text-sm ml-2">
              {steps[step - 1].title}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500 text-sm mr-2">Step {step} of 3</p>
            <div className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full">
              <p className="text-gray-500 text-sm">3</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          {step === 1 && (
            <Step1 data={data} handleNextStep={handleSelectStep} />
          )}
          {step === 2 && (
            <Step2 data={data} handleNextStep={handleSelectStep} />
          )}
          {step === 3 && <Step3 data={data} />}
        </div>
      </div>
    </div>
  );
}
