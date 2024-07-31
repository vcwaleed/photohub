import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

class ImageRating extends React.Component {
  render() {
    const { image } = this.props;

    // Logic to generate stars based on rating
    const stars = [];
    for (let i = 0; i < Math.floor(image.rating); i++) {
      stars.push(<FaStar key={i} style={{ color: 'gold' }} />);
    }
    if (image.rating % 1 !== 0) {
      stars.push(<FaStarHalfAlt key="half" style={{ color: 'gold' }} />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} style={{ color: '#ccc' }} />);
    }

    return (
      <p className="image-rating">
        {stars} ({image.rating.toFixed(2)})
      </p>
    );
  }
}

export default ImageRating;
