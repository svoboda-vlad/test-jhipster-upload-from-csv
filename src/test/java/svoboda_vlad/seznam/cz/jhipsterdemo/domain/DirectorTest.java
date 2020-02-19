package svoboda_vlad.seznam.cz.jhipsterdemo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import svoboda_vlad.seznam.cz.jhipsterdemo.web.rest.TestUtil;

public class DirectorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Director.class);
        Director director1 = new Director();
        director1.setId(1L);
        Director director2 = new Director();
        director2.setId(director1.getId());
        assertThat(director1).isEqualTo(director2);
        director2.setId(2L);
        assertThat(director1).isNotEqualTo(director2);
        director1.setId(null);
        assertThat(director1).isNotEqualTo(director2);
    }
}
