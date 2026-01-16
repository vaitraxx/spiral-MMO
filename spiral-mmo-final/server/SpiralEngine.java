
import java.util.*;

public class SpiralEngine {
    static final String TRIGGER = "batman";
    static final long MOMENT_1 = System.currentTimeMillis();
    static int worldLevel = 1;
    static int worldEnergy = 0;
    static Random rng = new Random((int)(Math.PI * 10000));

    static synchronized String process(String input, String player) {
        applyDecay();
        if (input.equalsIgnoreCase(TRIGGER)) {
            worldEnergy += rng.nextInt(6) + 1;
            if (worldEnergy >= 30) {
                worldLevel++;
                worldEnergy = 0;
                return "WORLD LEVEL UP → " + worldLevel;
            }
            return player + " acted | energy=" + worldEnergy;
        }
        return "WORLD STATE";
    }

    static void applyDecay() {
        long hours = (System.currentTimeMillis() - MOMENT_1) / (1000*60*60);
        int phase = (int)((hours % 24) / 8);
        if (phase == 1) worldEnergy -= worldEnergy * 0.05;
        if (phase == 2) worldEnergy -= worldEnergy * 0.15;
        if (worldEnergy < 0) worldEnergy = 0;
    }
}
