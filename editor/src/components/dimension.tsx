import React from "react";

export interface NumberInputProps {
    initial: number;
    onChange?: (x: number) => void;
}

export const NumberInput = (props: NumberInputProps) => {
    const [value, setValue] = React.useState(props.initial);

    const onValueChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        setValue(e.target.valueAsNumber);

        if (props.onChange) {
            props.onChange(e.target.valueAsNumber);
        }
    };

    return (
        <input type="number" value={value} onChange={onValueChange} />
    )
}

export interface DimensionInputProps {
    initialWidth: number;
    initialHeight: number;

    onChange: (w: number, h: number) => void;
}

export const DimensionInput = (props: DimensionInputProps) => {
    const [w, setW] = React.useState(props.initialWidth);
    const [h, setH] = React.useState(props.initialHeight);

    React.useEffect(() => {
        setW(props.initialWidth);
        setH(props.initialHeight);
    }, [props.initialWidth, props.initialHeight]);

    const onWidthChange = (w: number) => {
        setW(w);
        props.onChange(w, h);
    };

    const onHeightChange = (h: number) => {
        setH(h);
        props.onChange(w, h);
    }

    return (
        <div>
            <NumberInput initial={w} onChange={onWidthChange} />
            &nbsp;
            &times;
            &nbsp;
            <NumberInput initial={h} onChange={onHeightChange} />
        </div>
    );
};