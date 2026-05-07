import React from "react";

export interface NumberInputProps {
    initial: number;
    onChange?: (x: number) => void;
}

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    initial: number;
    onChange?: (x: number) => void;
}

export const NumberInput = (props: NumberInputProps) => {
    const [value, setValue] = React.useState(props.initial);
    const { onChange, initial, ...inputProps } = props;

    const onValueChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        setValue(e.target.valueAsNumber);

        if (onChange) {
            onChange(e.target.valueAsNumber);
        }
    };

    return (
        <input type="number" value={value} onChange={onValueChange} className="dimension-input" {...inputProps} />
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
        <div className="dimension-container">
            <NumberInput initial={w} onChange={onWidthChange} min={2} max={32} />
            &nbsp;
            <span className="dimension-separator">&times;</span>
            &nbsp;
            <NumberInput initial={h} onChange={onHeightChange} min={2} max={32} />
        </div>
    );
};