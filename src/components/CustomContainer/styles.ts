import styled from "styled-components";
import { colors } from "../../styles/Theme";

const MainContainer = styled.div`
  .card-body {
    @media (max-width: 1100px) {
      margin: 2rem 2.5rem !important;

      &.dashboardBody {
        margin: 0rem !important;
      }
    }

    @media (max-width: 576px) {
      margin: 1rem 0.4rem !important;
    }

    &.profileBody {
      @media (max-width: 1100px) {
        margin: 2rem 1rem !important;
      }

      @media (max-width: 576px) {
        padding: 0;
      }
    }
  }

  .card {
    border-radius: 0.625rem;
    box-shadow: 0rem 0rem 0.625rem ${colors.black};
    background: ${colors.white};
    border: none;
  }

  &.transferMain {
    margin: 3% 25% !important;
    @media (max-width: 1293px) {
      margin: 3% 18% !important;
    }
    @media (max-width: 992px) {
      margin: 3% 6% !important;
    }
    @media (max-width: 576px) {
      margin: 8% 4% !important;
    }
  }

  &.SignUpMain {
    margin: 10% 10% 0% 10% !important;

    @media (max-width: 1646px) {
      margin: 13% 12% 0% 12% !important;
    }

    @media (max-width: 1110px) {
      margin: 15% 13% 0% 13% !important;
    }

    @media (max-width: 992px) {
      margin: 15% 6% 0% 6% !important;
    }

    @media (max-width: 850px) {
      margin: 20% 6% 0% 6% !important;
    }

    @media (max-width: 576px) {
      margin: 30% 4% 0% 4% !important;
    }

    @media (max-width: 450px) {
      margin: 45% 4% 0% 4% !important;
    }
  }

  &.topUpTop {
    @media (max-width: 992px) {
      margin: 3% 6% 0% 6% !important;
    }
    
    @media (max-width: 576px) {
      margin: 8% 4% 0% 4% !important;
    }
  }

  &.topUpBottom {
    @media (max-width: 992px) {
      margin: 0% 6% 3% 6% !important;
    }

    @media (max-width: 576px) {
      margin: 0% 4% 8% 4% !important;
    }
  }

  @media (max-width: 992px) {
    margin: 3% 6% !important;
  }

  @media (max-width: 576px) {
    // default is margin: 3% 4% !important;
    margin: 8% 4% !important;
  }

  @media (max-width: 420px) {
    .card-body {
      padding: 10px;
    }
  }

  &.details {
    @media (max-width: 576px) {
      margin: 4% 5% !important;
    }
  }

  
`;

export { MainContainer };
