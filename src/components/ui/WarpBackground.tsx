import { Warp, type WarpProps } from '@paper-design/shaders-react';

export default function WarpBackground(props: WarpProps) {

    const defaultProps = {
        color1: '#000000',
        color2: '#940000',
        color3: '#000000',
        speed: 0.2,
        swirl: 0.98,
        swirlIterations: 41,
        shapeScale: 0.7,
        rotation: 0.55,
        scale: 0.5,
        proportion: 1.0,
        softness: 0,
        distortion: 0,
        style: { width: '100%', height: '100%' }
    };

    return <Warp {...defaultProps} {...props} style={{ ...defaultProps.style, ...props.style }} />;

}