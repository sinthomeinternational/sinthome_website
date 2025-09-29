import { Warp, type WarpProps } from '@paper-design/shaders-react';

export default function WarpBackground(props: WarpProps) {

    // Same colors as homepage for consistency
    const defaultProps = {
        color1: '#000000',  // Black
        color2: '#940000',  // Dark red (same as homepage)
        color3: '#000000',  // Black
        speed: 0.3,  // Slightly faster for more noticeable movement
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