import * as React from 'react';
import styled from 'styled-components';

type VideoProps = {
    src: string,
    onVideoEnd: () => void,
    hasPlayed: boolean,
    poster?: string,
}



const VideoElement = styled.video`
    ${(props: { hasPlayed: boolean }) => props.hasPlayed ? 'opacity: .2;' : null};
    width: 600px;
`

export class Video extends React.Component<VideoProps, {}> {

    state = {
        isPlaying: false
    }

    videoRef?: HTMLVideoElement;

    handleRef = (video: HTMLVideoElement) => {
        this.videoRef = video;
    };

    start = () => {
        if (this.videoRef !== null && this.videoRef && !this.props.hasPlayed) {

            this.videoRef.play();
            this.videoRef.requestFullscreen();
            this.videoRef.addEventListener('ended', () => {
                document.exitFullscreen()
                    .catch(e => console.error(e))
                    .finally(() => this.props.onVideoEnd());
            }, false);
        }
    }

    render() {

        return (
            <VideoElement poster={this.props.poster} src={this.props.src} ref={this.handleRef} onClick={this.start} hasPlayed={this.props.hasPlayed} />
        );
    }
}
